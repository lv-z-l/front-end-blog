const fs = require('fs')
const path = require('path')

const SRC_DIR = 'articles'

const TITLE_PRE_FIX = 'title: '
const TITLE_SUFFIX = 'author: '

const IGNORE_DIR = ['index', 'nav']

function read(path, res) {
  const dirs = fs.readdirSync(path)
  dirs.forEach(dir => {
    const current = path + '/' + dir
    const fileStat = fs.statSync(current)
    if (fileStat.isDirectory()) {
      read(current, res)
    } else {
      if (!IGNORE_DIR.includes(dir)) {
        const fileContent = fs.readFileSync(current)
        const text = fileContent.subarray(fileContent.indexOf(TITLE_PRE_FIX), fileContent.indexOf(TITLE_SUFFIX)).toString().replace('title: ', '').trim()
        res.push({ text, link: current.split(SRC_DIR)[1].replace('.md', '') })
      }
    }
  })
}

function getNavJs() {
  const res = []
  const source = path.resolve(SRC_DIR)
  const dirs = fs.readdirSync(source).filter(dir => !dir.includes('.'))
  for (let i = 0; i < dirs.length; i++) {
    const dir = dirs[i]
    const current = source + '/' + dir + '/nav.js'
    try {
      const data = require(current)
      if (data.sideText) {
        const sideDirs = fs.readdirSync(source + '/' + dir)
        data.sideDirs = sideDirs.filter(dir => !dir.includes('.'))
      }
      data.dir = dir
      res.push(data)
    } catch (error) {}
  }
  return res
}

export function genItems(dir) {
  const res = []
  read(path.resolve('articles/' + dir), res)
  return res
}

export function genNavSide() {
  const navJs = getNavJs()
  const nav = []
  const sidebar = {}
  navJs.sort((a, b) => a.sort - b.sort)
  for (let i = 0; i < navJs.length; i++) {
    const { dir, navText, sideDirs, sideText } = navJs[i]
    const navItem = {
      text: navText,
      link: `/${dir}/`,
    }
    if (sideDirs) {
      sidebar[`/${dir}/`] = sideDirs.map((sidedir, index) => ({
        text: sideText[index],
        items: genItems(`${dir}/${sidedir}`),
        collapsed: true,
      }))
    } else {
      sidebar[`/${dir}/`] = genItems(dir)
    }
    nav.push(navItem)
  }
  return {
    nav,
    sidebar,
  }
}

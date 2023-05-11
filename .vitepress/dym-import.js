import fs from 'fs'
import path from 'path'

const SRC_DIR = 'articles'

const titlePrefix = 'title: ', titleSuffix = 'author:'


function read(path, res) {
  const dirs = fs.readdirSync(path)
  dirs.forEach(dir => {
    const current = path + '/' + dir
    const fileStat = fs.statSync(current)
    if (fileStat.isDirectory()) {
      read(current, res)
    } else {
      if (dir !== 'index') {
        const fileContent = fs.readFileSync(current)
        const text = fileContent.subarray(fileContent.indexOf(titlePrefix), fileContent.indexOf(titleSuffix))
          .toString().replace('title: ', '').trim()
        res.push({ text, link: current.split(SRC_DIR)[1].replace('.md', '') })
      }
    }
  })
}

export default {
  genItems(dir) {
    const res = []
    read(path.resolve('articles/' + dir), res)
    return res
  }
}
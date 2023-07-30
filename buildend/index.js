const { readFileSync, writeFileSync } = require('fs')

const path = require('path')

const { JSDOM } = require('jsdom')

const htmlString = readFileSync(path.resolve('.vitepress/dist/index.html'), { encoding: 'utf-8' })

const dom = new JSDOM(htmlString)

const document = dom.window.document

const head = document.querySelector('head')

const meta = document.createElement('meta')
meta.setAttribute('name', 'referrer')
meta.setAttribute('content', 'never')

head.insertBefore(meta, head.childNodes[0])

writeFileSync(path.resolve('.vitepress/dist/index.html'), document.querySelector('html').outerHTML)

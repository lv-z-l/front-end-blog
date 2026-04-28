import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { JSDOM } from 'jsdom'

const htmlString = readFileSync(resolve('.vitepress/dist/index.html'), { encoding: 'utf-8' })

const dom = new JSDOM(htmlString)

const document = dom.window.document

const head = document.querySelector('head')

const meta = document.createElement('meta')
meta.setAttribute('name', 'referrer')
meta.setAttribute('content', 'never')

head.insertBefore(meta, head.childNodes[0])

writeFileSync(resolve('.vitepress/dist/index.html'), document.querySelector('html').outerHTML)

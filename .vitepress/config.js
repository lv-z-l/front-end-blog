import { defineConfig } from 'vitepress'
import { genNavSide } from './dym-import'

const path = require('path')

const { nav, sidebar } = genNavSide()

export default defineConfig({
  title: "Lvzl Blog",
  srcDir: './articles',
  description: "write something!",
  ignoreDeadLinks: true,
  vite: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../components'),
        '@pic': path.resolve(__dirname, 'public/assets')
      },
      extensions: ['.vue', '.js', '.json']
    }
  },
  themeConfig: {
    nav,
    sidebar,
    // logo: '/assets/tiger.jpg',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

function getTimeLines(articles) {
  const res = []
  articles.map(arl => {
    const { article_info } = arl
    const { title, ctime, brief_content, cover_image, tags } = article_info
    return {
      title,
      content: brief_content,
      cover_image,
      tag: tags.map(tag => tag.tag_name).join('、'),
      time: new Date(Number(ctime.padEnd(ctime.length + 3, '0'))).toLocaleDateString('zh-CN')
    }
  })
  return res
}

import { defineConfig } from 'vitepress'
import { genNavSide } from './dym-import'

const path = require('path')

const { nav, sidebar } = genNavSide()
debugger
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

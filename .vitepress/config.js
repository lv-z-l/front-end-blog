import { defineConfig } from 'vitepress'
import dym from './dym-import'

const path = require('path')

const { genItems } = dym
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
    // logo: '/assets/tiger.jpg',
    nav: [
      {
        text: 'html & css',
        link: '/html5css/html/'
      },
      {
        text: 'JavaScript',
        link: '/js/'
      },
      { text: '算法', link: '/algorithm/' },
      { text: '设计模式', link: '/designmode/' },
      { text: '八股文', link: '/somethingYouNeedKnow/url' },
      {
        text: 'Vue',
        items: [
          { text: 'Vue2', link: '/vue2/' },
          { text: 'Vue3', link: '/vue3/' }
        ]
      },
      {
        text: '优化相关',
        items: [
        ]
      },
      {
        text: '更多',
        items: [
          { text: '手写', link: '/write/async&await' },
          { text: '软连接&硬链接', link: '/hardlink&softlink/' },
          { text: '聊聊 npm & yarn & pnpm 包管理机制', link: '/packagemanager/' },
          { text: '前端路由', link: '/webrouter/' }
        ]
      }
    ],
    sidebar: {
      '/html5css/': [
        {
          text: 'html',
          link: 'html/'
        },
        {
          text: 'css',
          collapsed: true,
          items: genItems('html5css/css')
        }
      ],
      '/js/': [
        {
          text: '基础知识',
          link: '/js/'
        },
        {
          text: '深入知识',
          collapsed: true,
          items: genItems('js/deep')
        },
        {
          text: '模块化',
          collapsed: true,
          items: genItems('js/module')
        },
        {
          text: '内功修炼',
          collapsed: true,
          items: genItems('js/intention')
        }
      ],
      '/vue2/': [
        {
          text: 'Vue2及其使用',
          link: '/vue2/'
        },
        {
          text: 'Vue2源码学习',
          collapsed: true,
          items: genItems('vue2')
        }
      ],
      '/algorithm/': [
        {
          text: '链表相关',
          collapsed: true,
          items: genItems('algorithm/linkedList')
        },
        {
          text: '字符串相关',
          collapsed: true,
          items: genItems('algorithm/string')
        },
        {
          text: '数组相关',
          collapsed: true,
          items: genItems('algorithm/array')
        },
        {
          text: '树相关',
          collapsed: true,
          items: genItems('algorithm/tree')
        },
        {
          text: '其他',
          collapsed: true,
          items: genItems('algorithm/other')
        }
      ],
      '/designmode/': genItems('designmode'),
      '/write/': genItems('write')
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})

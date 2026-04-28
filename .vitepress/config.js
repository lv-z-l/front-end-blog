import { defineConfig } from 'vitepress'
import { genNavSide } from '../dym-import.js'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default (async () => {
  const { nav, sidebar } = await genNavSide()

  return defineConfig({
    title: 'Lvzl Blog',
    srcDir: './articles',
    description: 'write something!',
    ignoreDeadLinks: true,
    appearance: 'dark',
    base: '/front-end-blog/',
    vite: {
      resolve: {
        alias: {
          '@': resolve(__dirname, '../components'),
          '@pic': resolve(__dirname, 'public/assets'),
          '@use': resolve(__dirname, '../use'),
        },
        extensions: ['.vue', '.js', '.json'],
      },
    },
    themeConfig: {
      nav,
      sidebar,
      logo: 'https://p3-passport.byteimg.com/img/user-avatar/464e00b478bc3c604aad6b2518137d5a~180x180.awebp',
      socialLinks: [{ icon: 'github', link: 'https://github.com/lv-z-l/front-end-blog' }],
    },
  })
})()

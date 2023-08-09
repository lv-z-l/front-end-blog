import { origin } from './juejin-articles'

const alltags = []

for (let i = 1; i < origin.length; i++) {
  const { tags } = origin[i]
  tags && alltags.push(...tags.split('、'))
}

function getAnyColor() {
  const str = '456789abcdef'
  return (
    '#' +
    new Array(6)
      .fill('1')
      .map(() => str[Math.floor(Math.random() * 12)])
      .join('')
  )
}

const tagColors = {}

const filterTags = [...new Set(alltags)].filter(tag => !tag.startsWith('掘金'))

for (const tag of filterTags) {
  tagColors[tag] = getAnyColor()
}

export { origin, tagColors }

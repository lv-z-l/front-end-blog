import { origin } from './juejin-articles'

const alltags = []

for (let i = 1; i < origin.length; i++) {
  const { tags } = origin[i]
  tags && alltags.push(...tags.split('、'))
}

// Apple-style soft pastel color palette
const appleColors = [
  '#007AFF', // Blue
  '#5856D6', // Indigo
  '#AF52DE', // Purple
  '#FF2D55', // Pink
  '#FF3B30', // Red
  '#FF9500', // Orange
  '#FFCC00', // Yellow
  '#34C759', // Green
  '#5AC8FA', // Teal
  '#64D2FF', // Cyan
]

function getAnyColor() {
  return appleColors[Math.floor(Math.random() * appleColors.length)]
}

const tagColors = {}

const filterTags = [...new Set(alltags)].filter(tag => !tag.startsWith('掘金'))

for (const tag of filterTags) {
  tagColors[tag] = getAnyColor()
}

export { origin, tagColors }

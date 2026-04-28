---
# https://vitepress.dev/reference/default-theme-home-page
layout: page
---

<div id="main-page show">
  <div class="space">
    <tag v-for="tag in Object.keys(tagColors)" :class="[currentTag === tag ? 'current-tag' : '']"
      @click="filterArticleByTag(tag)" :color="tagColors[tag]">{{ tag }}</tag>
  </div>
  <div class="article-time-line">
    <div class="time-line">
      <time-line-item v-for="item in article" v-bind="item">
        <template v-slot:header>
          <div>
            <span class="color-span" @click="onLineClick(item)">{{ item.title }} </span>
            <div class="timeline-space" v-if="item.tags">
              <tag v-for="tag in item.tags.split('、')" size="small" :color="tagColors[tag]">
                {{ tag }}
              </tag>
            </div>
          </div>
        </template>
        <template v-slot:footer>
          <div>{{ item.time }}</div>
        </template>
        <div class="time-line-content">{{ item.content }}</div>
      </time-line-item>
    </div>
  </div>
</div>

<script setup>
import { reactive, ref } from 'vue'
import { origin, tagColors } from './timelines'
import TimeLineItem from '@/TimeLineItem'
import Tag from '@/Tag'

function onLineClick(item) {
  if (item.article_id) {
    window.open('https://juejin.cn/post/' + item.article_id)
  }
}

const show = ref(true)
let currentTag = ref('')
const originCopy = [...origin]
const article = reactive([])

function filterArticleByTag(tag) {
  if (currentTag.value === tag) {
    article.splice(0, article.length, ...originCopy)
    currentTag.value = ''
  } else {
    currentTag.value = tag
    const filtered = originCopy.filter(art => art.tags && art.tags.includes(tag))
    article.splice(0, article.length, ...filtered)
  }
}

article.push(...originCopy)

</script>

<style>
#main-page {
  min-height: calc(100vh - 64px);
  background-color: var(--vp-c-bg);
  overflow: auto;
  position: relative;
  left: 0;
  transition: left .4s ease-in-out;
}

.article-time-line {
  width: 100%;
  max-width: 980px;
  margin: 0 auto;
  padding: 8px 24px 64px 24px;
  display: flex;
}

.time-line {
  width: 100%;
}

.time-line-content {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  margin-top: 6px;
}

.space {
  padding: 16px 24px;
  position: sticky;
  z-index: 10;
  width: 100%;
  left: 0;
  top: 64px;
  background-color: color-mix(in srgb, var(--vp-c-bg) 80%, transparent);
  backdrop-filter: saturate(180%) blur(20px);
  -webkit-backdrop-filter: saturate(180%) blur(20px);
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 980px;
  margin: 0 auto;
  border-bottom: 1px solid var(--vp-c-divider);
}

.timeline-space {
  display: inline-flex;
  position: relative;
  width: auto;
  margin: 0;
  flex-wrap: wrap;
  gap: 0;
}

#main-page.hidden {
  left: -100%;
}

.current-tag {
  background-color: color-mix(in srgb, var(--tag-color) 24%, transparent) !important;
  box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--tag-color) 40%, transparent);
  transform: scale(1.06);
}

.dark .current-tag {
  background-color: color-mix(in srgb, var(--tag-color) 30%, transparent) !important;
  box-shadow: 0 0 0 1.5px color-mix(in srgb, var(--tag-color) 50%, transparent);
}

.color-span {
  padding-right: 16px;
  cursor: pointer;
  transition: color .2s ease;
}

.color-span:hover {
  color: var(--vp-c-brand-1);
}
</style>

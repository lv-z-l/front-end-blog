---
# https://vitepress.dev/reference/default-theme-home-page
layout: page
---

<div id="main-page" :class="[show ? 'show' : 'hidden']">
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
  <rail @visible-change="val => show = val" />
</div>

<script setup>
import { reactive, ref } from 'vue'
import Rail from '@/Rail'
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
  height: calc(100vh - 64px);
  background-image: url('https://mp-780ec593-98c3-47c6-9328-1690ac79007b.cdn.bspapp.com/images//hero-bg-2x.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  overflow: auto;
  position: relative;
  left: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  transition: left .4s ease-in-out;
}

.article-time-line {
  width: 100%;
  padding: 16px 64px 64px 64px;
  border-radius: 12px;
  display: flex;
}

.time-line {
  width: 100%;
}

.time-line-content{
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}

.space {
  padding: 0 64px 14px 64px;
  position: sticky;
  z-index: 1;
  width: 100%;
  left: 0;
  top: 0;
  background-color: var(--vp-c-bg);
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.timeline-space{
  display: inline-flex;
  position: relative;
  width: auto;
  margin: 0;
}

#main-page.hidden {
  left: -100%;
}

.current-tag::before {
  content: "✅";
}

.color-span {
  padding-right: 16px;
  cursor: pointer;
}
</style>

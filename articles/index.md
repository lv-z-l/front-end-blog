---
# https://vitepress.dev/reference/default-theme-home-page
layout: page
hero:
  name: "Lvzl Blog"
  text: "write something!"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /
    - theme: alt
      text: API Examples
      link: /
---

<div id="main-page">
  <n-space :class="['main-page-space', show ? 'show' : 'hidden']">
    <n-tag v-for="tag in Object.keys(tagColors)" :class="[currentTag === tag ? 'current-tag' : '']"
      @click="filterArticleByTag(tag)" :color="{ color: tagColors[tag] }" round>{{ tag }}</n-tag>
  </n-space>
  <img class="drone"
    src="https://mp-d22f2f25-96ec-4381-920f-a0d8df227b60.cdn.bspapp.com/cloudstorage/244d4f92-3334-4145-a458-6ba70c434393.webp" />
  <img class="cat"
    src="https://mp-d22f2f25-96ec-4381-920f-a0d8df227b60.cdn.bspapp.com/cloudstorage/0602edf6-e7d8-4457-947c-9b327ea59aa6.png" />
  <div :class="['article-time-line', show ? 'show' : 'hidden']">
    <n-timeline size="large">
      <n-timeline-item v-for="item in article" :type="item.time ? 'success' : 'error'" v-bind="item">
        <template v-slot:header>
          <div class="color-fff">
            <span class="color-fff-span" @click="onLineClick(item)">{{ item.title }} </span>
            <n-space v-if="item.tags" style="display: inline-flex;">
              <n-tag v-for="tag in item.tags.split('、')" size="small" :color="{ color: tagColors[tag] }" round>
                {{ tag }}
              </n-tag>
            </n-space>
          </div>
        </template>
        <template v-slot:footer>
          <div class="color-fff">{{ item.time }}</div>
        </template>
        <div class="color-fff">{{ item.content }}</div>
      </n-timeline-item>
    </n-timeline>
  </div>
  <rail @visible-change="val => show = val" />
</div>

<script setup>
import { reactive, ref } from 'vue'
import Rail from '@/Rail'
import { origin, tagColors } from '../.vitepress/timelines'
import * as timeline from 'naive-ui/lib/timeline'
import * as tag from 'naive-ui/lib/tag'
import * as space from 'naive-ui/lib/space'

const { NSpace } = space
const { NTag } = tag
const { NTimeline, NTimelineItem } = timeline

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
  background-image: url('https://mp-d22f2f25-96ec-4381-920f-a0d8df227b60.cdn.bspapp.com/cloudstorage/94ab6785-90da-4ebe-8810-1943b529fdc7.webp');
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  background-size: cover;
  position: relative;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
}

.drone {
  position: absolute;
  right: 32px;
  top: 32px;
  width: 160px;
  height: 104px;
  animation: upDown 5s linear alternate infinite forwards;
}

.cat {
  position: absolute;
  right: 0px;
  bottom: 32px;
  width: 300px;
  height: 303px;
}

.article-time-line {
  width: calc(100% - 300px);
  padding: 16px 64px 64px 64px;
  height: calc(100% - 120px);
  position: absolute;
  left: 0;
  top: 120px;
  overflow: auto;
  border-radius: 12px;
  display: flex;
}

.article-time-line.hidden {
  left: calc(0px - 100% + 300px);
}

.article-time-line,
.main-page-space {
  transition: left .6s linear;
}

.main-page-space {
  margin: 15px 64px;
  position: absolute;
  width: calc(100% - 300px);
  left: 0;
}

.main-page-space.hidden {
  left: -100%
}

.current-tag::before {
  content: "✅";
}

.color-fff {
  color: #fff;
}

.color-fff-span {
  padding-right: 16px;
  cursor: pointer;
}

@keyframes upDown {
  0% {
    top: 0;
  }

  100% {
    top: 64px
  }
}
</style>


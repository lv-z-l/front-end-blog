---
# https://vitepress.dev/reference/default-theme-home-page
layout: page
---

<div id="main-page">
  <div :class="['space', show ? 'show' : 'hidden']">
    <tag v-for="tag in Object.keys(tagColors)" :class="[currentTag === tag ? 'current-tag' : '']"
      @click="filterArticleByTag(tag)" :color="tagColors[tag]">{{ tag }}</tag>
  </div>
  <img class="drone"
    src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/hero-drone.webp" />
  <img class="cat"
    src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/astrocat.png" />
  <div :class="['article-time-line', show ? 'show' : 'hidden']">
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
  background-image: url('https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/hero-bg-2x.webp');
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
  /* animation: upDown 5s linear alternate infinite forwards; */
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

.article-time-line.hidden {
  left: calc(0px - 100% + 300px);
}

.article-time-line,
.space {
  transition: left .4s ease-in-out;
}

.space {
  margin: 0 64px 14px 64px;
  position: absolute;
  width: calc(100% - 300px);
  left: 0;
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

.space.hidden {
  left: -100%
}

.current-tag::before {
  content: "✅";
}

.color-span {
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

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

<script setup>
  import { h } from 'vue'
  import { NTimeline, NTimelineItem } from 'naive-ui'
  import timeLines from '../.vitepress/timelines'

  function onLineClick(item) {
    if(item.article_id) {
      window.open('https://juejin.cn/post/' + item.article_id)
    }
  }
</script>

<div id="main-page">
  <img class="drone" src="https://mp-d22f2f25-96ec-4381-920f-a0d8df227b60.cdn.bspapp.com/cloudstorage/244d4f92-3334-4145-a458-6ba70c434393.webp" />
  <img class="cat" src="https://mp-d22f2f25-96ec-4381-920f-a0d8df227b60.cdn.bspapp.com/cloudstorage/0602edf6-e7d8-4457-947c-9b327ea59aa6.png" />
  <div class="article-time-line">
    <n-timeline size="large">
      <n-timeline-item v-for="item in timeLines" @click="onLineClick(item)"  :type="item.time ? 'success' : 'error'"  v-bind="item" />
    </n-timeline>
  </div>
</div>

<style>
  #main-page {
    height: calc(100vh - 64px);
    background-image: url('https://mp-d22f2f25-96ec-4381-920f-a0d8df227b60.cdn.bspapp.com/cloudstorage/94ab6785-90da-4ebe-8810-1943b529fdc7.webp');
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;
    background-size: cover;
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
    padding: 64px;
    height: 100%;
    position: absolute;
    left: 0;
    overflow: auto;
    border-radius: 12px;
    display: flex;
  }
  /* .resume-wrapper {
    width: 380px;
    height: 300px;
    position: absolute;
    bottom: 32px;
    right: 300px;
  }
  .resume-content {
    backdrop-filter: blur(8px);
    height: 100%;
    border-radius: 12px;
    background-color: rgba(24, 0, 206, .2);
    box-shadow: 10px -10px 20px rgba(0,0,0,.2), -10px 10px 20px hsla(0,0%,100%,.1);
    display: flex;
  } */
  @keyframes upDown {
    0% {
      top: 0;
    }
    100% {
      top: 64px
    }
  }
</style>

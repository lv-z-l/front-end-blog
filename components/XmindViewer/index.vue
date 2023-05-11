<template>
  <div id="container-or-iframe-selector"></div>
</template>
<script setup>
import { XMindEmbedViewer } from 'xmind-embed-viewer'
import { onMounted } from 'vue'

const props = defineProps({
  url: String
})

onMounted(() => {
  const viewer = new XMindEmbedViewer({
    el: '#container-or-iframe-selector', // HTMLElement | HTMLIFrameElement | string
  })
  fetch(props.url)
    .then(res => res.arrayBuffer())
    .then(file => viewer.load(file))
    .catch(err => {
      console.log('加载xmind文件出错！')
    })
})

</script>
<style lang="scss"></style>
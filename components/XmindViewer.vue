<template>
  <div id="xmind-container">
    <loading v-if="showLoading"></loading>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import loading from '@/loading'

const showLoading = ref(true)

const props = defineProps({
  url: String
})

onMounted(async () => {
  const { XMindEmbedViewer } = await import('xmind-embed-viewer')
  const viewer = new XMindEmbedViewer({
    el: '#xmind-container', // HTMLElement | HTMLIFrameElement | string
  })
  viewer.setStyles({
    width: '100%',
    height: '100%'
  })
  fetch(props.url)
    .then(res => res.arrayBuffer())
    .then(file => {
      viewer.load(file)
      setTimeout(() => showLoading.value = false, 1000)
    })
    .catch(err => {
      showLoading.value = false
      console.log('加载xmind文件出错！')
    })
})

</script>

<style>
#xmind-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
<template>
  <div id="xmind-container">
    <n-spin size="medium" v-if="loading" />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as spin from 'naive-ui/lib/spin'
const loading = ref(true)

const props = defineProps({
  url: String
})

const { NSpin } = spin

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
      setTimeout(() => loading.value = false, 1000)
    })
    .catch(err => {
      loading.value = false
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

.n-spin-body {
  position: absolute;
}
</style>
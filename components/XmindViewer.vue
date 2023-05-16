<template>
  <div id="xmind-container" v-loading="loading"></div>
</template>
<script setup>
import vLoading from 'vue-next-directive/lib/directives/loading/index'
import { XMindEmbedViewer } from 'xmind-embed-viewer'
import { onMounted, ref } from 'vue'

const loading = ref(true)

const props = defineProps({
  url: String
})

onMounted(() => {
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
@import url('vue-next-directive/lib/assets/loading.css');

.loading .loading-content .desc {
  color: #8a8a8a;
}
</style>
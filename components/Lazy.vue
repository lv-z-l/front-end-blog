<template>
  <slot v-if="load"></slot>
  <div v-else ref="box" class="loading-box" :style="{ height: h, width: w }">
    <Loading v-if="!load"/>
  </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import Loading from '@/Loading'

function initLazyIntersectionObserver(fn) {
  const observer = new IntersectionObserver(
    entrys => entrys.forEach(entry => fn(entry)),
    {
      rootMargin: '0px',
      threshold: 0,
    }
  )
  return observer
}
const props = defineProps({
  w: {
    type: String,
    default: '100%'
  },
  h: {
    type: String,
    default: '100%'
  }
})

const load = ref(false)

const box = ref()

let observer

onMounted(() => {
  observer = initLazyIntersectionObserver(entry => {
    if (entry.isIntersecting) {
      nextTick(() => {
        load.value = true
        observer.unobserve(box.value)
        observer = null
      })
    }
  })
  observer.observe(box.value)
})

onBeforeUnmount(() => observer && observer.unobserve(box.value))

</script>
<style>
.loading-box {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, .5);
}
</style>

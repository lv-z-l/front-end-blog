<template>
  <div :class="['rail', show ? 'show' : '']" @click="onRailClick">
    <div class="rail-top"></div>
    <div class="rail-bottom"></div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
let show = ref(true)
const emit = defineEmits(['visible-change'])

const debounce = (fn, time) => {
  let timer = null;
  return (...argu) => {
    if(timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(null, argu)
      clearTimeout(timer)
      timer = null
    }, time)
  }
}

const onRailClick = () => {
  emit('visible-change', !show.value)
  show.value = !show.value
}

</script>
<style>
.rail {
  padding: 16px;
  position: fixed;
  left: 0;
  top: calc((100% - 120px) / 2);
  cursor: pointer;
}

.rail-top,
.rail-bottom {
  content: "";
  position: relative;
  width: 4px;
  height: 60px;
  background-color: rgb(219, 219, 223);
  border-radius: 2px;
  transition: transform .2s linear;
}

.rail-bottom {
  top: -2px;
}

.rail:hover .rail-top {
  transform: rotate(-4deg)
}

.rail:hover .rail-bottom {
  transform: rotate(4deg)
}

.show.rail:hover .rail-top {
  transform: rotate(4deg)
}

.show.rail:hover .rail-bottom {
  transform: rotate(-4deg)
}
</style>
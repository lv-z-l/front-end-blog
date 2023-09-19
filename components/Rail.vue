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

function onRailClick() {
  emit('visible-change', !show.value)
  setTimeout(() => show.value = !show.value, 1000)
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
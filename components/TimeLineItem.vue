<template>
  <Lazy h="120px">
    <main class="timeline color">
      <div class="timeline-wrapper">
        <header class="timeline-header">
        <slot name="header"></slot>
        </header>
        <slot></slot>
        <footer class="timeline-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
      <img class="cover_image" :src="attrs.cover_image" alt="cover image"/>
    </main>
  </Lazy>
</template>
<script setup>
import { useAttrs } from 'vue'
import Lazy from '@/Lazy'

const attrs = useAttrs()
</script>
<style>
.color {
  color: #fff;
}

.timeline {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-bottom: 5px;
  padding: 0 8px;
  align-items: center;
}

.timeline:not(:first-child) {
  border-top: 1px solid #e4e6eb;
  padding-top: 6px;
}


.cover_image {
  flex: 0 0 auto;
  width: 120px;
  height: 80px;
  margin-left: 24px;
  background-color: #fff;
  border-radius: 4px;
}

.timeline-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 14px;
}

.timeline-header {
  font-size: 16px;
  font-weight: bold;
}

.timeline-footer {
  font-size: 12px;
}
</style>
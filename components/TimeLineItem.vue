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
  color: var(--vp-c-text-1);
}

.timeline {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 20px 24px;
  align-items: center;
  border-radius: 16px;
  background-color: var(--vp-c-bg-soft);
  transition: all .3s cubic-bezier(.4, 0, .2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, .04), 0 1px 2px rgba(0, 0, 0, .02);
  margin-bottom: 12px;
}

.timeline:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, .08), 0 2px 8px rgba(0, 0, 0, .04);
  transform: translateY(-2px);
}

.dark .timeline {
  box-shadow: 0 1px 3px rgba(0, 0, 0, .2), 0 1px 2px rgba(0, 0, 0, .12);
}

.dark .timeline:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, .3), 0 2px 8px rgba(0, 0, 0, .16);
}

.cover_image {
  flex: 0 0 auto;
  width: 140px;
  height: 90px;
  margin-left: 24px;
  border-radius: 12px;
  object-fit: cover;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .06);
  transition: transform .3s cubic-bezier(.4, 0, .2, 1);
}

.timeline:hover .cover_image {
  transform: scale(1.03);
}

.timeline-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 15px;
  min-width: 0;
  flex: 1;
}

.timeline-header {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1.4;
}

.timeline-footer {
  font-size: 13px;
  color: var(--vp-c-text-2);
  margin-top: 6px;
}
</style>

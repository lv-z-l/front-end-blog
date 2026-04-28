<template>
  <div class="tag" :style="{ '--tag-color': props.color }" @click.stop="emits('click')">
    <slot></slot>
  </div>
</template>
<script setup>

const props = defineProps({
  color: String
})

const emits = defineEmits(['click'])

</script>
<style>
.tag {
  white-space: nowrap;
  margin-right: 6px;
  margin-top: 8px;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 10px;
  border-radius: 999px;
  color: var(--tag-color);
  background-color: color-mix(in srgb, var(--tag-color) 12%, transparent);
  transition: all .25s cubic-bezier(.4, 0, .2, 1);
  line-height: 1;
  height: 28px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  letter-spacing: 0.01em;
}

.tag:hover {
  background-color: color-mix(in srgb, var(--tag-color) 20%, transparent);
  transform: scale(1.04);
}

/* Dark mode adjustments */
.dark .tag {
  background-color: color-mix(in srgb, var(--tag-color) 18%, transparent);
}

.dark .tag:hover {
  background-color: color-mix(in srgb, var(--tag-color) 28%, transparent);
}
</style>

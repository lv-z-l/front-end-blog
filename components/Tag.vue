<template>
  <div class="tag" :style="{ backgroundColor: props.color }" @click.stop="emits('click')">
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
  margin-right: 8px;
  margin-top: 14px;
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  flex-wrap: nowrap;
  padding: 0 8px;
  border-radius: 6px;
  color: rgb(51, 54, 57);
  background-color: #b8de5f;
  transition: border-color .3s cubic-bezier(.4, 0, .2, 1), background-color .3s cubic-bezier(.4, 0, .2, 1), color .3s cubic-bezier(.4, 0, .2, 1), box-shadow .3s cubic-bezier(.4, 0, .2, 1), opacity .3s cubic-bezier(.4, 0, .2, 1);
  line-height: 1;
  height: 24px;
  font-size: 12px;
}
</style>
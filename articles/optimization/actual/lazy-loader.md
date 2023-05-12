---
title: 懒加载
author: lvzl
---
懒加载需要监听 DOM 的滚动事件，判断目标DOM 是否即将出现在可视区域，然后进行正在的加载。监听可通过两种方案实现：

- 监听滚动容器的 **scroll **事件，获取目标元素的位置（**getBoundingClientRect**），用可视区域的高度减去 元素的 top，如果 >= 0，即为可见。
- 也可直接使用 **IntersectionObserver **监听目标

Vue中可通过多种方式来实现懒加载的效果：

1. 组件
```vue
<template>
  <div :style="{ height: load ? 'auto' : 'calc(100vh - 158px)' }">
    <slot v-if="load"></slot>
    <div v-else class="lazy-loading">
      <span
        class="move lazy-loading-icon"
        title="努力加载中"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LazyLoader',
  data() {
    return {
      load: false
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(
      (entrys) => {
        entrys.forEach((entry) => {
          if (entry.isIntersecting) {
            this.load = true
            this.observer.unobserve(this.$el)
            this.observer = null
          }
        });
      },
      {
        threshold: 0,
      }
    )
    this.observer.observe(this.$el)
  },
  beforeDestroy() {
    this.observer && this.observer.unobserve(this.$el)
  }
}
</script>

<style>
.lazy-loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.lazy-loading-icon {
  font-size: 48px;
}
.move {
  animation: move 2s ease infinite;
}
@keyframes move {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(180deg);
  }
}
</style>
```

2. 指令

参考 **vue-next-directive**

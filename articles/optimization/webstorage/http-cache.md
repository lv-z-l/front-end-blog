---
title: 浏览器缓存策略
author: lvzl
---

> **缓存**可以减少网络 IO 消耗，提高访问速度。浏览器缓存是一种操作简单、效果显著的前端性能优化手段。

**Chrome** 官方给出的解释似乎更有说服力一些：

> 通过网络获取内容既速度缓慢又开销巨大。较大的响应需要在客户端与服务器之间进行多次往返通信，这会延迟浏览器获得和处理内容的时间，还会增加访问者的流量费用。因此，缓存并重复利用之前获取的资源的能力成为性能优化的一个关键方面。

浏览器缓存机制有四个方面（按照获取资源时的优先级排序）：
<img data-fancybox="gallery" src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/http-cache.jpeg"/>

<script setup>
  import useFancybox from '@use/useFancybox.js'
  useFancybox()
</script>

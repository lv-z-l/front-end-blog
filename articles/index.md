---
# https://vitepress.dev/reference/default-theme-home-page
layout: page
hero:
  name: "Lvzl Blog"
  text: "write something!"
  tagline: My great project tagline
  actions:
    - theme: brand
      text: Markdown Examples
      link: /
    - theme: alt
      text: API Examples
      link: /
---

<script setup>
  import { Suspense } from 'vue'
  import CustomHome from '@/CustomHome'
</script>

<Suspense>
  <CustomHome/>
</Suspense>


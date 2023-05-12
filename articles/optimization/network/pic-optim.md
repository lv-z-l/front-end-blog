---
title: 图片优化篇
author: lvzl
---

| 图片格式 | 体积 | 压缩(有损/无损) | 支持透明 | 缺点 | 适用场景 |
| --- | --- | --- | --- | --- | --- |
| jpg/jpeg | 小 | 有损 | ❌ | 不支持透明；用于其他场景效果不好，比如 Logo | 适用于色彩丰富的图片，比如大的背景图、轮播图或 Banner 图 |
| png | 大 | 无损 | ✅ | 体积太大 | 小的 Logo、颜色简单且对比强烈的图片或背景等 |
| svg | 很小 | 无损 | ✅ | 是可编程的文本文件，有着学习成本；可以是DOM的一部分，渲染成本高，对性能不利 | 矢量图形 |
| base64 | 根据情况 | 无损 | ✅ | 只适用于很小的图标，因为图片转为base64编码之后体积会膨胀为图片体积的4/3倍。因此，图片越大，转base64编码之后会变的更大，会得不偿失。 | 小图标，为了减少加载网页图片时对服务器的请求次数，可直接将图片变为base64编码写入html/css，所以严格来讲，base64是一种编码方式，而并非一种图片格式 |
| webp | 小 | 有损 | ✅ | 需要考虑浏览器兼容性。如下图是淘宝网的一件衣服的链接，注意到图片的后缀 .jpg_.webp![image.png](https://cdn.nlark.com/yuque/0/2023/png/22819120/1681303196989-223668e0-79f3-40db-a5ee-1c5cffac8452.png#averageHue=%23fcfcfb&clientId=ub5329ade-488b-4&from=paste&height=250&id=ueea8567e&originHeight=500&originWidth=770&originalType=binary&ratio=2&rotation=0&showTitle=false&size=114871&status=done&style=none&taskId=uffb01d0d-a20f-42f8-a734-284d5895f7a&title=&width=385)也可以让后端同事处理一下，让服务器根据 HTTP 请求头部的 Accept 字段来决定返回什么格式的图片。 | WebP集多种图片文件格式的优点于一身，适用于大多数场景。 |


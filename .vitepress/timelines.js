const origin = [
  {
    title: 'Vue3源码阅读——响应式是如何实现的（track + trigger篇）',
    article_id: '7252283213187432505',
    content:
      '前言 本文属于笔者Vue3源码阅读系列第五篇文章，往期精彩： 生成vnode到渲染vnode的过程是怎样的 组件创建及其初始化过程 响应式实现——reactive篇 响应式是如何实现的（ref + R',
    cover_image:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbb4b1d45bd64c7090b848f3797ae64b~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、Vue.js、源码阅读',
    time: '2023/7/6',
  },
  {
    title: 'Vue3源码阅读——响应式是如何实现的（ref + ReactiveEffect篇）',
    article_id: '7251237669013913655',
    content:
      'Vue3源码阅读： 1. ref 的实现。 2. effect的实现（可以不用太关注，因为没用）。 3. ReactiveEffect的实现，这个是依赖类，非常重要。 4. 依赖收集详解。',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b7187f55b0b4d6b9b3cfa3f5ed90c61~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、源码阅读、JavaScript',
    time: '2023/7/3',
  },
  {
    title: 'Vue3源码阅读——响应式是如何实现的（reavtive篇）',
    article_id: '7245145631181307962',
    content:
      'Vue3源码阅读系列的第三篇文章，往期精彩： 生成vnode到渲染vnode的过程是怎样的 组件创建及其初始化过程。本文主要对应reactive部分：创建响应式代理对象以及代理对象handler实现',
    cover_image:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6dfacd34638435382e9762161af9926~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、JavaScript、源码阅读',
    time: '2023/6/16',
  },
  {
    title: 'Vue3源码阅读——组件创建及其初始化过程',
    article_id: '7244018340879155258',
    content:
      '前言 本文属于笔者Vue3源码阅读系列第二篇文章，上一篇文章Vue3源码阅读——初始化流程笔者很详细的写出了vue3初始化的过程。本文的重点——组件创建及其初始化过程。',
    cover_image:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac673ffde4184c239f82a871e8ba5617~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、JavaScript、源码阅读',
    time: '2023/6/13',
  },
  {
    title: 'Vue3源码阅读——初始化流程',
    article_id: '7243383094774120506',
    content:
      '前言 接着上一篇Vue3带来了哪些更新和优化，本文跟随笔者走进Vue3的源码世界，一同探索Vue3的初始化流程。 ❗️源码中有很多代码是用于处于边缘case的，我们阅读源码先关注主要分支实现的原理，不',
    cover_image:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ab38dad83724810bf727cd42dad2496~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、JavaScript、源码阅读',
    time: '2023/6/12',
  },
  {
    title: 'Vue3带来了哪些更新和优化',
    article_id: '7239241544960131129',
    content:
      '前言 笔者最近在学习Vue3，通过本文和各位掘友聊聊Vue3带来了哪些更新和优化。 本文主要内容包括以下两个部分： Vue 的简要发展历程 Vue3 的更新及优化点 Vue 简要发展历程 我们都知道，',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cda4127d5f548068e45f61df3f6c39c~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、JavaScript、面试',
    time: '2023/5/31',
  },
  {
    title: '4种方案带你探索 Vue.js 代码复用的前世今生',
    article_id: '7238604002354987064',
    content:
      'Vue.js在如何提取公共代码复用方面一直在探索优化，本文笔者就来和各位聊聊Vue.js代码复用的前世今生。有4种方案：mixin、高阶组件、scoped slots、Composition API',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/848301a37a2e473da97e1c0e8ac49a94~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、JavaScript、面试',
    time: '2023/5/30',
  },
  {
    title: '学了设计模式，我重构了原来写的垃圾代码',
    article_id: '7224205585125556284',
    content:
      '本文正在参加「金石计划」 前言 最近笔者学习了一些设计模式，本着 学东西不能停留在用眼睛看，要动手实践 的理念，笔者今天带来的是一篇关于代码逻辑重构的文章，将学到的东西充分运用到实际的项目中。',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c32ed6a463504d61a89b3cbc7e71eb90~tplv-k3u1fbpfcp-watermark.image?',
    tags: '掘金·金石计划、JavaScript、设计模式',
    time: '2023/4/21',
  },
  {
    title: '各种图片格式的适用场景总结',
    article_id: '7222549965272645689',
    content:
      '本文正在参加「金石计划」 前言 本文的主要内容是 —— 在项目中不同场景的图片如何选择恰当的格式，以优化加载，又兼顾显示的效果。而不是随便什么格式，只在乎图片显示的效果。我们还需要去考虑很多问题',
    cover_image:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aaa4597959094779bf193bd44d2a8970~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、性能优化、掘金·金石计划',
    time: '2023/4/16',
  },
  {
    title: '2023 年了，让你的 webpack 卷起来！',
    article_id: '7222196467115671613',
    content:
      '本文正在参加「金石计划」本文的主要内容属于**网络篇**，目标是让应用包 **构建更快，体积更小，加载更快**，那肯定绕不开打包的工具，笔者以 `webpack` 为例，例举一些优化配置。',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45a86aeedd2f4547816c372a56421d1f~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Webpack、掘金·金石计划、性能优化',
    time: '2023/4/15',
  },
  {
    title: '盘点使用 Monaco Editor 实现在线代码编辑的一些需求',
    article_id: '7218419207129415738',
    content:
      '本文跟各位掘友详细聊聊我在项目中通过集成**Monaco Editor**实现的些需求点，如果在后面各位用到能帮到你的话就更好了😃！',
    cover_image:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e76c23d184b1442aa002f427ff833333~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、JavaScript、掘金·金石计划',
    time: '2023/4/5',
  },
  {
    title: '面试官：你可以用 for of 遍历 Object 吗？',
    article_id: '7217304466076631096',
    content:
      '本文正在参加「金石计划」 前言 本文属于我的 前端需要掌握的设计模式 专栏。上一篇：# 说说 观察者模式 和 发布——订阅模式 的区别。 本文以 用 for of遍历 Object 为引 来聊聊 迭代',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32938d0ae94142f68fa09c28cbd942f8~tplv-k3u1fbpfcp-watermark.image?',
    tags: '面试、JavaScript、掘金·金石计划',
    time: '2023/4/2',
  },
  {
    title: '说说 观察者模式 和 发布——订阅模式 的区别',
    article_id: '7216994437246255161',
    content:
      '本文正在参加「金石计划」 前言 本文属于我的 前端需要掌握的设计模式 专栏。上一篇：状态模式 和 策略模式 分不清？可以问问 chatgpt塞。 观察者模式 和 发布订阅模式 与其他的设计模式相比，面',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fbc1207c29bf42db86498d45d77a0a1c~tplv-k3u1fbpfcp-watermark.image?',
    tags: '面试、掘金·金石计划、JavaScript',
    time: '2023/4/1',
  },
  {
    title: '状态模式 和 策略模式 分不清？可以问问 chatgpt塞',
    article_id: '7215963267491184700',
    content:
      '本文正在参加「金石计划」 本文主要内容： 状态模式 状态模式 与 策略模式 的区别 本文属于我的前端需要掌握的设计模式专栏。上一篇# 很多人早都已经实践策略模式了，却说不知道策略模式是啥？ 状态模式是',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd68109f836f45b195691c5b98f74cae~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、设计模式、掘金·金石计划',
    time: '2023/3/29',
  },
  {
    title: '很多人早都已经实践策略模式了，却说不知道策略模式是啥？',
    article_id: '7215465880883675195',
    content:
      '简单举个例子，聊聊策略模式如何让我们的代码更整洁！本文属于我的设计模式专栏。 什么是策略模式？ 策略模式指的是定义一系列的算法，把它们一个个封装起来，目的就是分离算法的使用 与 实现 一个基于策略模式',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6b7973ace57d4d4489cd0b7253c8c56f~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、设计模式、掘金·日新计划',
    time: '2023/3/28',
  },
  {
    title: '前端要掌握的设计模式——代理模式',
    article_id: '7215207897520750629',
    content:
      '什么是代理模式 出于某种原因，我们不能直接访问到一个对象的属性和方法，需要一个中间人（代理）帮我们去访问，再把结果给我们，这种模式就是代理模式。 案例 科学上网——VPN 代理 都知道，我们访问一个网',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8e030074a634f24aac22b40252188b1~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、设计模式、掘金·日新计划',
    time: '2023/3/27',
  },
  {
    title: '前端要掌握的设计模式——适配器模式',
    article_id: '7213252345551487013',
    content:
      '什么是适配器模式 把一个类的接口变换成客户端所期待的另一种接口，通常用来解决不兼容的问题。 举个🌰： 喜欢听歌的你有一副音质很棒的3.5mm圆形插口🎧，但是你的手机很旧了，换了个新的，你发现这个新手机',
    cover_image:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/541c4f4c1a9548c1b4de9f7734b0e69f~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、设计模式、掘金·日新计划',
    time: '2023/3/22',
  },
  {
    title: '开源一个高颜值的多端音乐项目',
    article_id: '7212940154381090871',
    content:
      '本文算是上一篇文章：# Vue3多端项目实战——开发一个多端音乐 APP我踩了很多坑！的续集，在发布上一篇之后，有几位掘友评论/私信我，问能不能把 GitHub 链接分享出来，但是由于项目中还有一些待',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c0956be459c484bb45d231ea22a7d1f~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、Vue.js、GitHub',
    time: '2023/3/21',
  },
  {
    title: 'Vue3多端项目实战——开发一个多端音乐 APP我踩了很多坑！',
    article_id: '7210784861250027579',
    content:
      'Vue3 项目实战：和大家详细聊聊我用 uni-app Vue3 开发 多端音乐 APP的过程，App 效果展示，开发中遇到的一些坑。',
    cover_image:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba7e0f58d09a440794628f5594b393ec~tplv-k3u1fbpfcp-watermark.image?',
    tags: '掘金·日新计划、Vue.js、uni-app',
    time: '2023/3/16',
  },
  {
    title: '也许这是Vue3最简单的懒加载方案了（适用图片/组件）',
    article_id: '7204661393500602423',
    content:
      '什么是懒加载 说起懒加载，想必各位掘友都很了解，是优化前端页面的一种方式，就是能不加载的内容就不加载，首次加载的内容变少，加载速度也就快了，也就提升了用户体验。当用户快要浏览到 或 操作到 未加载的内',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ef6241996fd34cc09926105faeeb224e~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、JavaScript、掘金·日新计划',
    time: '2023/2/27',
  },
  {
    title: '前端要掌握的设计模式——装饰器模式',
    article_id: '7202428482655567932',
    content:
      '什么是装饰器模式 指在不改变现有对象结构的情况下，动态地给该对象增加一些职责（即增加其额外功能）的模式，它属于对象结构型模式。 ✅ 优点 装饰器模式的主要优点有： 装饰器是继承的有力补充，比继承灵活，',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82be79f72d504f049e9b8fd8fe1f56fc~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、设计模式、掘金·日新计划',
    time: '2023/2/21',
  },
  {
    title: '前端要掌握的设计模式——单例模式',
    article_id: '7199456238191460409',
    content:
      '前端要掌握的设计模式——工厂模式。本文主要内容是单例模式。 什么是单例模式 从名字上就能看出一些端倪， 单例 —— 独一无二的实例，没错，就是指一个类只有一个实例，在一个应用中访问到的都是这个实例',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a588da65707944589ea68e3bbd7d207f~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、设计模式、掘金·日新计划',
    time: '2023/2/13',
  },
  {
    title: '前端要掌握的设计模式——工厂模式',
    article_id: '7197070078361436221',
    content:
      '前言 大家好，我是 Lvzl，本文属于我的专栏——前端需要掌握的设计模式系列，上一篇前端要掌握的设计模式——原型模式 & 构造器模式。本文主要内容是工厂模式。 以一个🌰为引 在说工厂模式之前，先看个🌰',
    cover_image:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae0ff2352b1347ef86714c8ef944829c~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、设计模式、掘金·日新计划',
    time: '2023/2/7',
  },
  {
    title: '前端要掌握的设计模式——原型模式 & 构造器模式',
    article_id: '7196859948553994299',
    content:
      '前言 大家好，我是 Lvzl，本文属于我的专栏——前端需要掌握的设计模式系列，上一篇文章 前端需要掌握的设计模式——开篇，今天正式开始学习设计模式。 咱先来看看设计模式的分类，下图中共有23种设计模式',
    cover_image:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da35d44debea43baa6ca970ec6cc100b~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、设计模式、掘金·日新计划',
    time: '2023/2/6',
  },
  {
    title: '前端需要掌握的设计模式——开篇（前端为啥要学习设计模式？）',
    article_id: '7195792730573439032',
    content:
      '前言 大家好，我是 Lvzl，从今天开始，决定学习前端需要掌握的设计模式，然后会将我学到的总结为文章持续更新到 我的专栏——前端需要掌握的设计模式，有计划学习的掘友可以帮忙三连一下，一起学习，一起变强',
    cover_image:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b80780b6052a413b97b6ed61247cae1e~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、掘金·日新计划、设计模式',
    time: '2023/2/3',
  },
  {
    title: '当面试被问到JavaScript面向对象，需要掌握哪些知识点？',
    article_id: '7195369668146626617',
    content:
      '前言 面向对象编程的思想是非常重要的，面向对象表示的知识更接近客观世界，表示方案更加自然，易于理解。学习面向对象的思想有利于我们开发的功能具有以下优点： 良好的模块性 良好的可维护性 可扩充性 可重用',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9067768613743c5975765fcdc109925~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、前端、掘金·日新计划',
    time: '2023/2/2',
  },
  {
    title: '这些 function 的细节你都知道吗？',
    article_id: '7159029805030047758',
    content:
      '我正在参加「掘金·启航计划」 大家好，我是 Lvzl, 一个三年工作经验的前端小菜鸡，在掘金平台分享一些 平时学习的感悟 & 实际项目场景 的文章。 本文主要内容：详细聊聊 JavaScript 函数',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1ae415d22054c2ab440a9748f0eadb8~tplv-k3u1fbpfcp-watermark.image?',
    tags: '前端、JavaScript、面试',
    time: '2022/10/27',
  },
  {
    title: '你还在手动集成Electron？我开发了一个包，安装即集成',
    article_id: '7156598021378015245',
    content:
      '我正在参加「掘金·启航计划」 大家好，我是 Lvzl, 一个三年工作经验的前端小菜鸡，在掘金平台分享一些 平时学习的感悟 & 实际项目场景 的文章。 本文主要内容：通过安装一个npm包实现electr',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33b80fe9fda14173a0f944bf6c06938f~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Electron、Vue.js、JavaScript',
    time: '2022/10/20',
  },
  {
    title: 'Vue3指令——搜索框输入防抖实现',
    article_id: '7156209800714387492',
    content:
      '我正在参加「掘金·启航计划」 大家好，我是 Lvzl, 一个三年工作经验的前端小菜鸡，在掘金平台分享一些 平时学习的感悟 & 实际项目场景 的文章。 前言 「搜索🔍」这个场景在各种业务的系统中都是是非',
    cover_image:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/167bb45974474fe8967d484509097ea1~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、JavaScript、前端',
    time: '2022/10/19',
  },
  {
    title: 'Node.js 连接 MySql 统计组件属性的使用情况',
    article_id: '7153190284661096462',
    content:
      '我正在参加「掘金·启航计划」 今天给大家带来的是一篇实际场景的问题解决方案：Node.js 连接 MySql 统计组件属性的使用情况。',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbd382e86b9540e9856084ceb1d18ed1~tplv-k3u1fbpfcp-watermark.image?',
    tags: '前端、MySQL、Node.js',
    time: '2022/10/11',
  },
  {
    title: '用css动画写一个“灵动岛”玩玩吧',
    article_id: '7146170515407765541',
    content:
      '我正在参加「掘金·启航计划」 用CSS动画实现一个iPhone“灵动岛”。我正在参加「掘金·启航计划」',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0cdb8eb45655452ca3a30d7028b21d7a~tplv-k3u1fbpfcp-watermark.image?',
    tags: '前端、CSS、HTML',
    time: '2022/9/22',
  },
  {
    title: '我是怎么开发一个Babel插件来实现项目需求的?',
    article_id: '7137198113688649765',
    content:
      '我正在参与掘金创作者训练营第6期，点击了解活动详情 Babel插件，Javascript代码转换，我是怎么开发一个Babel插件来实现项目需求的?',
    cover_image:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1103d4c00cd74ab490a5c1c3fc32fbf6~tplv-k3u1fbpfcp-watermark.image?',
    tags: '前端、JavaScript、Babel',
    time: '2022/8/29',
  },
  {
    title:
      'VueRouter路由页签都关闭了，keep-alive缓存还在？来看看我是怎么解决的吧',
    article_id: '7136588477419749412',
    content:
      '我正在参与掘金创作者训练营第6期，点击了解活动详情 问题描述 前几天笔者遇到这样一个问题，在项目中使用keep-alive缓存路由，路由是以页签那种方式打开的，当页签切换，我们需要路由缓存，当页签关闭',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5ca7338c4b94a819b8b1e6829b9011d~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js、前端',
    time: '2022/8/28',
  },
  {
    title: '手把手教你写一个简版 create-vite 并发布到npm仓库',
    article_id: '7136090555267678221',
    content:
      '我正在参与掘金创作者训练营第6期，点击了解活动详情 前言 想必各位掘友在平时的工作中应该都使用过下面这些命令： Vue-cli 快速创建一个项目 搭建第一个 Vite 项目 就算你没用过上面这两个，那',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04769c5e98c44d8fb4cb41b0d58c3e0f~tplv-k3u1fbpfcp-watermark.image?',
    tags: '前端、JavaScript',
    time: '2022/8/26',
  },
  {
    title: '2022年已经过了三分之二，我才开始学TypeScript',
    article_id: '7135749530061897735',
    content:
      '什么是TypeScript 引用官方定义： 特性 类型系统，弥补了JavaScript的缺点 我们都知道，JavaScript中是没有类型可言的。 一个变量定义的时候是 string类型, 可能一会就',
    cover_image:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05baff444c7044e2bad9333656f456d1~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'TypeScript、前端',
    time: '2022/8/25',
  },
  {
    title: 'JavaScript这些创建对象的方式你都知道吗？',
    article_id: '7130143539215728647',
    content:
      '前言 面试官：在JavaScript中都有哪些创建对象的方式？ 我：花括号直接创建啊 面试官： 然后就没了然后...... 接下来为大家详细介绍下JavaScript中创建对象的几种方式，及其优缺点。',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4a629add7af94b40b3aeabd5555f61a8~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、前端',
    time: '2022/8/10',
  },
  {
    title: 'HTTP缓存这么重要，快来了解下',
    article_id: '7126764337330405407',
    content:
      '我正在参与掘金创作者训练营第5期，点击了解活动详情 前言 提到缓存，想必各位都能想到它的作用 —— 是性能优化的一个方面，用来节约时间，提升效率，在前端有很多场景都有用到缓存： webpack V5的',
    cover_image:
      'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca8fab41e1df4b169cfe26ddeee51d83~tplv-k3u1fbpfcp-watermark.image?',
    tags: '前端、面试',
    time: '2022/8/1',
  },
  {
    title: '我帮你整理了怎么让div垂直水平居中的方法',
    article_id: '7126556500104839182',
    content:
      '前言 这也算是面试中比较常见的题目了，脑子里快速过一下，各位掘友能想起来多少种？ 能想起来超过三种的。 少于三种的，看下面我为你整理好的方案，收藏起来，用到时直接CV。 让div垂直水平居中 分两种情',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9c2ff59471654c73a7fd64857ace5309~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'CSS、前端',
    time: '2022/7/31',
  },
  {
    title: '面试官：能说下Javascript执行机制吗？',
    article_id: '7125824572800106503',
    content:
      '携手创作，共同成长！这是我参与「掘金日新计划 · 8 月更文挑战」的第3天，点击查看活动详情 前言 各位掘友，现在假设一下你在参加面试，面试官就问了你这个问题——能说下Javascript执行机制吗？',
    cover_image:
      'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/750f4bdb27974b419ea3e8134c237794~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript、Vue.js',
    time: '2022/7/29',
  },
  {
    title: '前端er，花三两分钟了解下JS内存？',
    article_id: '7125446677867020301',
    content:
      '携手创作，共同成长！这是我参与「掘金日新计划 · 8 月更文挑战」的第2天，点击查看活动详情 内存是用来存什么的 通俗的来说呢，就是用来存 var，let，function，const声明的变量。 内',
    cover_image:
      'https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f50f6a1f958429fae7aa8a096ee6f40~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'JavaScript',
    time: '2022/7/28',
  },
  {
    title: '如何优雅的实现锚点功能',
    article_id: '7125421657094619167',
    content:
      '我正在参与掘金创作者训练营第5期，点击了解活动详情 锚点是什么 相信各位掘友应该都知道，锚点就是类似快捷导航目录的功能，大多是为了提升用户体验的。 大家都见过的🌰： 掘金的右侧目录 Naive UI的',
    cover_image:
      'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fab61f55f06648e9bc90f157a0e86749~tplv-k3u1fbpfcp-watermark.image?',
    tags: 'Vue.js',
    time: '2022/7/28',
  },
]

const alltags = []

for (let i = 1; i < origin.length; i++) {
  const { tags } = origin[i]
  tags && alltags.push(...tags.split('、'))
}

/**
 * 从掘金的接口获取数据并处理返回
 * @param {*} articles
 * @returns
 */
function getTimeLines(articles) {
  return articles.map(arl => {
    const { article_info, tags } = arl
    const { title, ctime, brief_content, cover_image } = article_info
    return {
      title,
      content: brief_content,
      cover_image,
      tags: tags.map(tag => tag.tag_name).join('、'),
      time: new Date(
        Number(ctime.padEnd(ctime.length + 3, '0'))
      ).toLocaleDateString('zh-CN'),
    }
  })
}

function getAnyColor() {
  const str = '456789abcdef'
  return (
    '#' +
    new Array(6)
      .fill('1')
      .map(() => str[Math.floor(Math.random() * 12)])
      .join('')
  )
}

const tagColors = {}

const filterTags = [...new Set(alltags)].filter(tag => !tag.startsWith('掘金'))

for (const tag of filterTags) {
  tagColors[tag] = getAnyColor()
}

export { origin, tagColors }

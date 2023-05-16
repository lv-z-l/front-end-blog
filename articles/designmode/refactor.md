---
title: 重构代码
author: lvzl
---

## 前言
最近笔者学习了一些设计模式，都记录在我的专栏 [前端要掌握的设计模式](https://juejin.cn/column/7195725894869254202) 中，感兴趣的掘友可以移步看看。本着 **学东西不能停留在用眼睛看，要动手实践** 的理念，笔者今天带来的是一篇关于代码逻辑重构的文章，将学到的东西充分运用到实际的项目中。

### 重构代码的背景
要重构的代码是之前笔者的一篇文章——[我是怎么开发一个Babel插件来实现项目需求的?](https://juejin.cn/post/7137198113688649765)，大概的逻辑就是实现 JS 代码的一些转换需求：
1. 去掉箭头函数的第一个参数（如果是`ctx`）`(ctx, argu1) => {}`转换为`(argu1) => {}`
2. 函数调用加上`this.`: `sss(ctx)` 转换为 `this.sss()`
3. `ctx.get('one').$xxx()` 转换为 `this.$xxxOne()`；
4. `const crud = ctx.get('two'); crud.$xxx();`转换为`this.$xxxTwo()`
5. ```
   /**
   * 处理批量的按钮显示隐藏
   * ctx.setVisible('code1,code2,code3', true)
   * 转化为
   * this.$refs.code1.setVisible(true)
   * this.$refs.code2.setVisible(true)
   * this.$refs.code3.setVisible(true)
   */
   ```
6. 函数调用把部分 API 第一参数为`ctx`的变为`arguments`
7. 函数调用去掉第一个参数（如果是`ctx`）
8. 函数声明去掉第一个参数（如果是`ctx`）
9. 普通函数 转为 () => {}
10. 标识符`ctx` 转为 `this`
11. `ctx.data` 转为 `this`
12. `xp.message(options)`  转换为 `this.$message(options)`
13. `const obj = { get() {} }` 转化为 `const obj = { get: () => {} }`

具体的实现可参考之前的文章，本文主要分享一下重构的实现。

## 重构前
所有的逻辑全写在一个 JS 文件中：
![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d96662bd20a4a75b476ad291bf9c3aa~tplv-k3u1fbpfcp-watermark.image?)
还有一段逻辑很长：
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f2f61ccb712465485f60b3fb4755336~tplv-k3u1fbpfcp-watermark.image?)

### 为啥要重构？
虽然主体部分被我折叠起来了，依然可以看到上面截图的代码存在很多问题，而且主体内容只会比这更糟：
1. 难以维护，虽然写了注释，但是让别人来改根本看不明白，改不动，甚至不想看
2. 如果新增了转换需求，不得不来改上面的代码，**违反开放封闭**原则。因为你无法保证你改动的代码不会造成原有逻辑的 bug。
3. 代码没有章法，乱的一批，里面还有一堆 `if/else`、`try/catch`
4. 如果某个转换逻辑，我不想启用，按照现有的只能把对应的代码注释，依然是具有破坏性的

基于以上的这些问题，我决定重构一下。

## 重构后
先来看下重构后的样子：
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a4645257a98a4a0a8057636214d70950~tplv-k3u1fbpfcp-watermark.image?)
统一将代码放到一个新的文件夹`code-transform`下：
- `transfuncs`文件夹用来放具体的转换逻辑
- `util.js`中有几个工具函数
- `trans_config.js`用于配置`transfuncs`中转换逻辑是否生效
- `index.js` 导出访问者对象 `visitor`（可以理解为我们根据配置动态组装一个 `visitor` 出来）
### transfuncs下面的文件格式
如下图所示，该文件夹下的每个 JS 文件都默认导出一个函数，是真正的转换逻辑。
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3072875330bd48998619a29cc323a4a9~tplv-k3u1fbpfcp-watermark.image?)
文件名命名规则：`js ast树中节点的type`_`执行转换的大概内容`
### 其余三个文件内容概览
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14d51c25c11f4c73af6359a46ecaa21f~tplv-k3u1fbpfcp-watermark.image?)
其中笔者主要说明一下`index.js`：
```js
import config from './trans_config'

const visitor = {}
/**
 * 导出获取访问者对象的函数
 */
export function generateVisitorByConfig() {
  if (Object.keys(visitor).length !== 0) {
    return visitor
  }
  // 过滤掉 trans_config.js 中不启用的转换规则
  const transKeys = Object.keys(config).filter(key => config[key])
  // 导入 ./transfuncs 下的转换规则
  const context = require.context('./transfuncs', false, /\.js$/)
  const types = new Set()
  // 统计我们定义的转换函数，是哪些 ast 节点执行转换逻辑
  // 别忘了文件名命名规则：js ast树中节点的type_执行转换的大概内容
  // 注意去重，因为我们可能在同一种节点类型，会执行多种转换规则。
  // 比如 transfuncs 下有多个 CallExpression_ 开头的文件。
  context.keys().forEach(path => {
    const fileName = path.substring(path.lastIndexOf('/') + 1).replace('.js', '')
    const type = fileName.split('_')[0]
    types.add(type)
  })
  
  const arrTypes = [...types]
  // 到此 arrTypes 可能是这样的：
  // ['CallExpression', 'FunctionDeclaration', 'MemberExpression', ...]
  // 接着遍历每种节点 type
  
  arrTypes.forEach(type => {
    const typeFuncs = context.keys()
      // 在 transfuncs 文件夹下找出以 对应 type 开头
      // 并且 trans_config 中启用了的的文件
      .filter(path => path.includes(type) && transKeys.find(key => path.includes(key)))
      // 得到文件导出的 function
      .map(path => context(path).default)
    // 如果 typeFuncs.length > 0，就给 visitor 设置该节点执行的转换逻辑
    typeFuncs.length > 0 && (visitor[type] = path => {
      typeFuncs.forEach(func => func(path, attribute))
    })
  })
  // 导出 visitor
  return visitor
}
```
最后调用:
```js
import { generateVisitorByConfig } from '../code-transform'

const transed = babel.transform(code, {
  presets: ['es2016'],
  sourceType: 'module',
  plugins: [
    {
      visitor: generateVisitorByConfig()
    }
  ]
}).code
```
有些掘友可能对`babel`的代码转换能力、`babel`插件不是很了解, 看完可能还处于懵的状态，对此建议各位先去我的上一篇[我是怎么开发一个Babel插件来实现项目需求的?](https://juejin.cn/post/7137198113688649765) 大致看下逻辑，或者阅读一下[Babel插件手册](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fjamiebuilds%2Fbabel-handbook%2Fblob%2Fmaster%2Ftranslations%2Fzh-Hans%2Fplugin-handbook.md)，看完之后自然就通了。

## 总结
到此呢，该部分的代码重构就完成了，能够明显看出：
1. 文件变多了，但是每个文件做的事情更专一了
2. 可以很轻松启用、禁用转换规则了，`trans_config`中配置一下即可，再也不用注释代码了
3. 可以很轻松的新增转换逻辑，你只需要关注你在哪个节点处理你的逻辑，注意下文件名即可，你甚至不需要关心引入文件，因为会自动引入。
4. 更容易维护了，就算离职了你的同事也能改的动你的代码，不会骂人了
5. 逻辑更清晰了
6. 对个人来说，代码组织能力提升了😃

👊🏼**感谢观看！如果对你有帮助，别忘了 点赞 ➕ 评论 + 收藏 哦！**

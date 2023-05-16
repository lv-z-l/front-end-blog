---
title: Webpack 构建优化策略
author: lvzl
---

本文也发表于[掘金社区](https://juejin.cn/editor/drafts/7221808657532796985)
## 前言

提起性能优化，相信各位掘友都不陌生，而且各位也有着在工作 或 个人项目中实践总结得出的真理。在笔者看来，性能优化是一门很难修炼的秘籍，一旦修炼成功就是质变，所以即便再难还是值得我们去慢慢探索和学习的。因此笔者将我看到的，学来的，或者自己总结出的一些点记录在我的专栏[前端性能优化](https://juejin.cn/column/7148310408695119909)

性能优化的目的从来都是明确的：**速度更快，体积更轻，体验更好**。围绕这个中心主题，我们可以在以下这些方面进行优化：
- 网络
- 存储（缓存）
- 渲染
- 实际应用中的一些优化手段（比如算法）
- 等等......

## webpack 优化配置

本文的主要内容属于**网络篇**，目标是让应用包 **构建更快，体积更小，加载更快**，那肯定绕不开打包的工具，笔者以 `webpack` 为例，例举一些优化配置。（我们主要学习的是这种优化的方向和方法，其他的构建工具只是配置不同，原理都是差不多的）。

在这之前，我们先想想下面两个问题：

怎么让构建更快？
- 少处理一些文件，干的事情少了，是不是就会快了
- 不处理没变化的文件（使用缓存）
- 提前处理好一些文件（不会经常变化那种），不用每次构建都重复处理一些不会经常变的依赖
- 买个好电脑, 多线程构建

怎么让体积更小？

- 资源压缩（代码、图片、音视频资源、html、css、js、字体）
- `gzip`压缩
- 提取公共模块代码
- 去掉没用到的资源

达成以上两点，加载应该也就快了。

### exclude/include

配置 `exclude/include`，可以减少处理的文件数量，通常在各个 `Loader` 中配置，避免不必要的转译。

```js
module.exports = {
    // ...
    module: {
        rules: [{
            exclude: /node_modules/,
            include: /src/,
            test: /\.js$/,
            use: "babel-loader"
        }]
    }
};
```

### 使用编译缓存

使用编译缓存，构建时未变化的文件如果存在缓存就使用缓存，不再编译。减少编译数量以提升构建速度。有些 `Loader/Plugin` 会提供一个可使用编译缓存的选项，通常包含 `cache` 字眼。比如 `babel-loader` 和 `eslint-webpack-plugin` :
```js
import EslintPlugin from "eslint-webpack-plugin";

module.exports = {
    // ...
    module: {
        rules: [{
            // ...
            test: /\.js$/,
            use: [{
                loader: "babel-loader",
                options: { cacheDirectory: true }
            }]
        }]
    },
    plugins: [
        new EslintPlugin({ cache: true })
    ]
};
```

如果没有缓存相关选项，可以用`cache-loader`:

```js
module.exports = {
  module: {
    rules: [
      {
        test: /.ext$/,
        use: ['cache-loader', ...loaders],
        include: path.resolve('src'),
      },
    ],
  },
};
```

### 配置`externals`排除一些依赖

`externals`配置可在打包的时候排除一些依赖，排除的依赖需要手动引入，可以直接下载一个生产环境的包在`index.html`中引入，来一个例子:

```js
module.exports = {
  // 其他配置
  externals: {
    //  需要将对应的js文件直接在index.html中引入
    vue: 'Vue',
    'vue-router': 'VueRouter',
    vuex: 'Vuex',
    axios: 'axios',
    xlsx: 'XLSX',
    echarts: 'echarts',
  },
  // 其他配置
}
```

在上面的配置中，我们指定了`vue、vue-router、axios、xlsx、echarts`这几个包在构建时不处理，而是在`index.html`中引入。其中`externals` 配置的 `key` 为包名, `value`是这个包导出的变量名。比如：
![WechatIMG15.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/21b2a1ae57594e439fb150b81fcdf8a9~tplv-k3u1fbpfcp-watermark.image?)

### 提前打包第三方依赖

利用`DllPlugin`提前打包第三方依赖，提前将不会经常变化的依赖/模块打包为`DLL`文件并存到硬盘里，再次打包时动态链接`DLL`文件，就无需再次打包那些公共代码，只构建业务代码，从而减少打包时间。（`webpackV2`就已存在，`webpackV4+`已不推荐使用，因为版本升级带来的构建提升可以忽略该配置带来的效果，但为了那几秒提升，还是可以配置上的。）

可参考  [webpack 文档中的示例](https://webpack.docschina.org/plugins/dll-plugin/#dllplugin)

✅也可使用 `autodll-webpack-plugin` 代替手动配置

### `thread-loader`多线程构建

利用`thread-loader`开启多个线程并行构建，(通常用于较耗时的`loader`，若项目需要处理的文件不是很多，没必要采用这种优化手段，因为开启多个线程也会存在性能开销。)

```js
import Os from 'os';

export default {
    // ...
    module: {
        rules: [{
            // ...
            test: /\.js$/,
            use: [{
                loader: 'thread-loader',
                options: { workers: Os.cpus().length }
            }, {
                loader: 'babel-loader',
                options: { cacheDirectory: true }
            }]
        }]
    }
};
```

### 可视化分析优化

使用`webpack-bundle-analyzer`分析打包产物，可直观分析打包文件的模块组成部分、模块体积占比、模块包含关系、模块依赖关系、文件是否重复、压缩体积对比等可视化数据，然后有针对性优化。

```js
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

export default {
    // ...
    plugins: [
        // ...
        BundleAnalyzerPlugin()
    ]
};
```

### splitChunks

使用 `splitChunks`分割各个模块代码，提取相同部分代码。`splitChunks` 的[配置项](https://webpack.docschina.org/configuration/optimization/#optimizationsplitchunks)很多，需要根据项目实际情况进行相应的配置。


### Tree Shaking

摇树优化`（Tree Shaking）mode` 为 `production` 时默认开启优化，无需额外配置，不过只对`ESM`规范的模块生效。

```js
export default {
    // ...
    mode: 'production'
};
```

### 代码垫片

#### @babel/preset-env和core-js。
`@babel/preset-env` 的 `useBuiltIns` 配置说明：
```js
module.exports = {
  presets: [['@babel/preset-env', { useBuiltIns: 'xxx' }]], // false / entry / usage
  plugins: ['@babel/plugin-syntax-dynamic-import']
}
```
- `false`：无视`target.browsers`将所有`Polyfill`加载进来。
- `entry`：根据`target.browsers`将部分`Polyfill`加载进来(仅引入有浏览器不支持的`Polyfill`，需在入口文件`import 'core-js/stable'`)。
- `usage`：根据`target.browsers`和检测代码里`ES6`的使用情况将部分`Polyfill`加载进来(无需在入口文件`import 'core-js/stable'`)。
#### 动态垫片 
动态垫片可根据浏览器`UserAgent`返回当前浏览器`Polyfill`，其思路是根据浏览器的`UserAgent`从`browserlist`查找出当前浏览器哪些特性缺乏支持从而 返回这些特性的`Polyfill`。动态垫片的服务参考：
- https://polyfill.io/v3/polyfill.min.js
- https://polyfill.alicdn.com/polyfill.min.js

```js
import HtmlTagsPlugin from 'html-webpack-tags-plugin';

export default {
    plugins: [
        new HtmlTagsPlugin({
            append: false, // 在生成资源后插入
            publicPath: false, // 使用公共路径
            tags: ['https://polyfill.alicdn.com/polyfill.min.js'] // 资源路径
        })
    ]
};
```

### 按需加载

按需加载将路由页面/触发性功能单独打包为一个文件，使用时才加载，减轻首屏渲染的负担，因为项目功能越多其打包体积越大，导致首屏渲染速度越慢。把项目中只有当触发某些功能时才会用到的资源文件使用 `import()` 导入，`webpack` 会将这个模块识别为异步模块独立成为 `chunk`，仅当需要时才会发送网络请求加载。可能控制台会报错，需要在`Babel`的配置文件中加上以下配置：
```js
babel: {
    plugins: ['@babel/plugin-syntax-dynamic-import']
 }
```
`import()`语法参考：
```js
// 单个目标
import(
  /* webpackChunkName: 'my-chunk-name' */
  /* webpackMode: 'lazy' */
  /* webpackExports: ['default', 'named'] */
  'module'
);

// 多个可能的目标
import(
  /* webpackInclude: /\.json$/ */
  /* webpackExclude: /\.noimport\.json$/ */
  /* webpackChunkName: 'my-chunk-name' */
  /* webpackMode: 'lazy' */
  /* webpackPrefetch: true */
  /* webpackPreload: true */
  `./locale/${language}`
);
```

### 压缩资源

压缩资源（`HTML/CSS/JS`代码，压缩字体/图像/音频/视频）能够有效减少打包体积，极致地优化代码都有可能不及优化一个资源文件的体积更有效。

`html`使用`html-webpack-plugin`开启压缩功能：

```js
import HtmlPlugin from 'html-webpack-plugin';

module.exports = {
    // ...
    plugins: [
        // ...
        HtmlPlugin({
            // ...
            minify: {
                collapseWhitespace: true,
                removeComments: true
            } // 压缩HTML
        })
    ]
};
```
`css`压缩使用`optimize-css-assets-webpack-plugin`:
```js
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

module.exports = {
    // ...
    optimization: {
        // ...
        minimizer: [
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: {
                    autoprefixer: { remove: false }, // 设置autoprefixer保留过时样式
                    safe: true // 避免cssnano重新计算z-index
                }
            })
        ] // 代码压缩
    }
}
```


`ES5`压缩使用`uglifyjs-webpack-plugin`：
```js
import UglifyjsPlugin from 'uglifyjs-webpack-plugin'

module.exports = {
    // ...
    optimization: {
        // ...
        minimizer: [
            new UglifyjsPlugin({
                cache: true, // 缓存文件
                parallel: true, // 并行处理
                uglifyOptions: {
                    beautify: false,
                    compress: { drop_console: true }
                } // 压缩配置
            })
        ] // 代码压缩
    }
};
```

`ES6`的`JS`代码压缩使用`terser-webpack-plugin`
```js
import TerserPlugin from 'terser-webpack-plugin'

module.exports = {
    // ...
    optimization: {
        // ...
        minimizer: [
            new TerserPlugin({
                cache: true, // 缓存文件
                parallel: true, // 并行处理
                terserOptions: {
                    beautify: false,
                    compress: { drop_console: true }
                } // 压缩配置
            })
        ] // 代码压缩
    }
};
```

图片可直接使用开源的 `tinyimg-webpack-plugin` 插件。

```js
import TinyimgPlugin from 'tinyimg-webpack-plugin';

module.exports = {
    // ...
    plugins: [
        // ...
        TinyimgPlugin()
    ]
};
```

### `Gzip`压缩

- 是一种`HTTP`压缩的方式。
- 如果不是几`kb`的文件，都可开启`Gzip`试试。
- 通常经过`Gzip`压缩后，大约能够减少`70%`的体积。
- `webpack`的`Gzip`使用 `compression-webpack-plugin` 插件实现（可以为服务器分压，毕竟服务器压缩需要时间开销和 `CPU` 开销）

**压缩原理：在被压缩的文本文件中找出一些重复的字符串并临时替换它们，达到减小体积的目的。因此若文本文件中的重复代码越多，压缩的效果就越好**。

#### 服务端开启Gzip
```
客户端请求头设置: accept-encoding:gzip
服务端（nginx）:
#开启和关闭gzip模式
gzip on|off;

#gizp压缩起点，文件大于1k才进行压缩
gzip_min_length 1k;

# gzip 压缩级别，1-9，数字越大压缩的越好，也越占用CPU时间
gzip_comp_level 1;

# 进行压缩的文件类型。
gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript ;

#nginx对于静态文件的处理模块，开启后会寻找以.gz结尾的文件，直接返回，不会占用cpu进行压缩，如果找不到则不进行压缩
gzip_static on|off

# 是否在http header中添加Vary: Accept-Encoding，建议开启
gzip_vary on;

# 设置压缩所需要的缓冲区大小，以4k为单位，如果文件为7k则申请2*4k的缓冲区 
gzip_buffers 2 4k;

# 设置gzip压缩针对的HTTP协议版本
gzip_http_version 1.1;
```
#### webpack Gzip plugin
```js
const CompressionPlugin = require("compression-webpack-plugin");
plugins: [
  new CompressionPlugin({
    filename: "[path][base].gz",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8,
  }),
  //...
]
```

## 参考
>[写给中高级前端关于性能优化的 9 大策略和 6 大指标 | 网易四年实践](https://mp.weixin.qq.com/s/nES0HWRyTVg05sfxj25WJQ)


> 掘金小册——[前端性能优化原理与实践](https://juejin.cn/book/6844733750048210957)
## 总结
本文主要围绕 “让应用包 **构建更快，体积更小，加载更快**” 这一中心主题例举了使用 webpack 构建应用时的一些优化配置，但这并不是什么标准答案，针对不同情况的应用，会有很多优化的手段。本文主要想突出的是当我们要去着手优化项目时的**方向**以及一些基本的优化思路，比如：
- 构建时间太长，那是否可以通过减少构建时处理的文件数量来优化？或者提前将一些不会经常变化的构建好，不重复构建？再或者使用构建的缓存？
- 依然很慢？是否能启用多线程构建提升速度？
- 还慢？深入找找瓶颈？
- 包体积很大？是否能压缩？是否能 Tree Shaking? 分割包？提取可共用逻辑？懒加载？

不知我们可曾想过一个问题：**以上这些为啥构建工具都有 配置/插件 让我们使用？** 

我觉得因为我们站在巨人的肩上。已经有前辈想到了这些优化思路并加以实现了。

性能优化没有标准答案，只要效果好，就是对的。举个最简单的例子：同一个应用，本文的优化点你全安排上了，在你电脑上可能确实快了，换了个好几年前的电脑可能差很多，因为电脑的配置还不一样呢，CPU 的核心数，硬盘的读写性能，很多因素都会影响。

所以让人家换个好点的电脑到底算不算一条优化点😂。

感谢观看！欢迎各位掘友一起讨论你们是如何优化项目的，一起学习！一起成长！




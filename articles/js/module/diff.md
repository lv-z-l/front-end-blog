---
title: 各种模块化方案的区别
author: lvzl
---

- AMD，CMD都是异步加载依赖模块。最明显的区别就是在模块定义时对依赖的处理不同
  - AMD推崇依赖前置，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
  - CMD推崇就近依赖，只有在用到某个模块的时候再去require。

ES Modules（ECMAScript Modules）和CommonJS是两种不同的模块系统，它们在 JavaScript 中用于组织和导入/导出代码，有以下主要区别：

1. **语法差异：**
   - **ES Modules：** 使用 `import` 和 `export` 关键字来导入和导出模块。例如，`import moduleName from 'modulePath'` 用于导入模块，`export functionName` 用于导出函数或变量。
   - **CommonJS：** 使用 `require()` 函数来导入模块，使用 `module.exports` 或 `exports` 来导出功能。例如，`const moduleName = require('modulePath')` 用于导入模块，`module.exports = functionName` 用于导出函数或变量。

2. **加载时机：**
   - **ES Modules：** ES Modules 在编译时进行加载和解析，模块的依赖关系在代码执行之前就已经确定。
   - **CommonJS：** CommonJS 模块在运行时加载和解析，模块的依赖关系在代码执行时动态确定。

3. **同步 vs. 异步：**
   - **ES Modules：** ES Modules 默认是同步加载的，但可以使用 `import()` 动态导入来实现异步加载。
   - **CommonJS：** CommonJS 模块通常是同步加载的，这意味着模块的所有依赖必须在代码执行前解析。

4. **浏览器支持：**
   - **ES Modules：** ES Modules 是现代浏览器的一部分，可以在浏览器端直接使用。
   - **CommonJS：** CommonJS 最初是为服务器端（如Node.js）设计的，不是浏览器的原生模块系统。在浏览器中使用需要使用工具进行转换或依赖于模块加载器。

5. **静态分析：**
   - **ES Modules：** ES Modules 允许进行静态分析，这意味着工具可以在代码执行之前检查模块的依赖关系和语法。
   - **CommonJS：** CommonJS 模块是在运行时加载的，不容易进行静态分析。

总的来说，ES Modules 更加现代化，支持静态分析和异步加载，适用于浏览器和服务器端。CommonJS 在服务器端使用广泛，但在浏览器端需要额外的工具或模块加载器的支持。选择哪种模块系统通常取决于你的开发环境和需求。
# JS模块化

## 导入&导出模块

为了获得模块的功能要做的第一件事是把它们导出来。使用 export 语句来完成。
最简单的方法是把它export放到你想要导出的项前面，比如：

```js
export const name = 'square';

export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color
  };
}
你能够导出函数，var，let，const, function和类。export要放在最外层；比如不能够在函数内使用export。
export { name, draw, reportArea, reportPerimeter };
```

### 导入/导出模块：

```js
import { name, draw, reportArea, reportPerimeter } from 'JS文件';
```

#### 默认导出（export default）

在一个JS模块中，比如有一个名为randomSquare()的函数，将它作为默认导出：

```js
export default randomSquare;
// 或者
export default function(ctx) {
  ...
}
```

导入时：

```js
import randomSquare from '';
// 相当于
import {default as randomSquare} from './modules/square.mjs';
```



#### 重命名导入与导出

```js
export {
     function1 as FunctionName1,
     function2 as FunctionName2
};
import { 
	FunctionName1, 
	FunctionName2 
} from '';
// 或者
export { function1, function2 };
import { 
	function1 as FunctionName1,
	function2 as FunctionName2 
} from '';
```

#### 创建模块对象

导入每一个模块功能到一个模块功能对象上。

```js
import * as Module from '';
// 这将获取所有可用的导出，并使它们可以作为对象模块的成员使用，从而有效地为其提供自己的命名空间。
Module.function1()
Module.function2()
```



#### 模块与类（class）

导出和导入类; 这是避免代码冲突的另一种选择，如果您已经以面向对象的方式编写了模块代码，那么它尤其有用。

```js
class Square {
  constructor(ctx, listId, length, x, y, color) {
    ...
  }

  draw() {
    ...
  }

  ...
}
// 导出
export { Square };
// 使用
let square1 = new Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, 'blue');
```

#### 合并模块

```js
export * from 'x.mjs'
export { name } from 'x.mjs'
有如下文件目录：
modules/
  canvas.mjs
  shapes.mjs
  shapes/
    circle.mjs
    square.mjs
    triangle.mjs
在每个子模块中，输出具有相同的形式，例如，
export { Square };
 在shapes.mjs里面，我们包括以下几行：
export { Square } from '/js-examples/modules/module-aggregation/modules/shapes/square.mjs';
export { Triangle } from '/js-examples/modules/module-aggregation/modules/shapes/triangle.mjs';
export { Circle } from '/js-examples/modules/module-aggregation/modules/shapes/circle.mjs';
main.mjs 文件中，我们可以通过替换来访问所有三个模块类。
import { Square, Circle, Triangle } from './modules/shapes.mjs';
```





### 动态加载模块

浏览器中可用的JavaScript模块功能的最新部分是动态模块加载。 这允许您仅在需要时动态加载模块，而不必预先加载所有模块。 这有一些明显的性能优势; 

允许您将import()作为函数调用，将其作为参数传递给模块的路径。 它返回一个 promise，它用一个模块对象来实现（参见Creating a module object），让你可以访问该对象的导出，例如

```js 
import('/modules/myModule.mjs')
  .then((module) => {
    // Do something with the module.
  });
```


---
title: React 学习总结
author: lvzl
---

# React 学习总结

## 什么是 React
**React 是 Facebook 推出的一个用于构建用户界面的 JavaScript 库。**


## React 特点
- 声明式：React 采用声明式编程，可以让你将 UI 组件看作是函数或类，而不是对象。
- 组件化：React 组件让你将 UI 拆分成独立的、可重用的代码块，并将它们组合成更大的 UI。
- 高效：React 通过对 DOM 的模拟，最大限度地减少与 DOM 的交互

## React 类组件及其生命周期（不推荐使用）
**React 类组件开发如下，只需要了解即可，现在都函数组件开发**

```jsx
class ComponentName extends React.Component {

  // 构造函数最先执行
  constructor(props) {
    super(props);
  }
  state = {
    // 组件的状态
    name: 'Hello React！',
  }
    // 当组件抛出错误时，会触发此生命周期方法。可以用来从错误中恢复，返回一个值以更新 state
  static getDerivedStateFromError(error) {
    console.log('getDerivedStateFromError');
  }

  // 当组件接收新的 props 时，会触发此生命周期方法。可以返回一个对象以更新 state，或返回 null 表示不需要更新 state
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  // 在 DOM 更新之前立即调用，返回值将作为 componentDidUpdate 的第三个参数
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return null;
  }

  // 组件挂载（插入 DOM 树中）后立即调用，只会在客户端执行，是请求数据的好地方
  componentDidMount() {
    console.log('componentDidMount');
  }

  // 组件卸载及销毁之前直接调用，可以在此方法中执行必要的清理操作
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // 组件完成更新后立即调用，首次渲染不会调用
  componentDidUpdate() {
    console.log('componentDidUpdate');
  }

  // 当组件抛出错误时，此生命周期方法会被触发，用于记录错误信息、发送网络请求或者清理无效的本地状态等
  componentDidCatch() {
    console.log('componentDidCatch');
  }

  // 当组件接收新的 props 时会调用，但在 React 17 中已被废弃，建议使用 getDerivedStateFromProps
  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps');
  }

  // 当组件接收新的 props 或 state 时，会在渲染前调用，返回 false 可以阻止渲染
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  // 在渲染前调用，但在 React 17 中已被废弃，建议使用 getSnapshotBeforeUpdate
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate');
  }

  // 在渲染前调用，但在 React 17 中已被废弃，建议使用 componentDidMount
  componentWillMount() {
    console.log('componentWillMount');
  }

  // 绑定更新逻辑
  onClick() {
    this.setState({
      name: 'Hello React！',
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.name}</h1>
        <button onClick={this.onClick}>
          点击
        </button>
      </div>
  }
}
```

## React函数组件（推荐使用）
函数组件使用 `JSX` 的语法开发，说的简单些，JSX 其实就是在 html（或者说是模版） 中能够写 js，但并不是使用 script 标签那种方式，而是使用 `{}`, 在`{}`中可以写任何的js表达式或语法。

### 那 `JSX` 的本质是什么？
先看一个例子，一个最简单的例子，我们通过对比这个例子的 开发态 和 运行态 来看看JSX的本质到底是什么。

开发态：
```jsx
const Test = function () {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log('click')
    setCount(count + 1);
  }, [count]);

  return <div onClick={handleClick}>click me {count}</div>;
};

ReactDom.render(<Test />, document.getElementById('app'));
```

运行态：
```js
const Test = function () {
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    console.log('click');
    setCount(count + 1);
  }, [count]);
  return /*#__PURE__*/React.createElement("div", {
    onClick: handleClick
  }, "click me ", count);
};

ReactDom.render( /*#__PURE__*/React.createElement(Test, null), document.getElementById('app'));
```

不难观察出，开发态 和 运行态 的区别就是在 JSX 的节点，`<div></div>`变成了 `React.createElement('div', attrs, child)`。不难猜出`React.createElement`的实现应该大致如下所示：
```js
React.createElement = (tag, attrs, ...children) => {
  if (typeof tag === 'string') {
    const node = document.createElement(tag);
    Object.keys(attrs).forEach(key => {
      if(isDomAttr(key)) { // dom 属性
        node.setAttribute(key, attrs[key]);
      } else if(isEvent(key)) { // 事件监听
        node.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
      } else {
        // xxx
      }
    });
    children.forEach(child => node.appendChild(child))
  }
  if (typeof tag === 'function') { // 组件
    return tag({
      ...attrs,
      children
    });
  }
}
```
那是什么把jsx 转换成 React.createElement 的呢？一想到转换，那跟 Babel 就扯上关系了(@babel/preset-react)。
<img width="50%" src="https://mp-cb2e47ef-a802-469a-a81c-2b6efa9f8b60.cdn.bspapp.com/blog-resource/images/iScreen Shoter - Google Chrome - 231217220102.jpg">

React 函数组件的基本格式如下：

```jsx
// 接收一个参数props， 能够获取到父组件传入的prop，以及children
export default function ComponentName(props) {
  const onClick = () => {
    console.log('点击了H1');
    props.onH1Click && props.onH1Click(); // 调用父组件的onH1Click事件，相当于 Vue 的 $emit 派发事件
  };
  return (
    <div>
      <h1 onClick={onClick}>{props.name}</h1>
    </div>
  );
}
```

### React Hooks

Hooks 是 React 16.8 的新增特性，它可以让我们通过函数组件的方式开发 `React` 应用，并可以使用 `state` 以及其他 `React` 特性。

### useState
`useState`用于声明一个状态，并返回一个数组，数组的第一个元素是状态的值，第二个元素是更新状态的函数。在`React`中，所有的状态更新都需要通过`setState`方法来进行，`setState`方法可以接收一个函数，这个函数会接收当前的`state`作为参数，并返回一个新的`state`；也可以直接接收一个新的`state`。(**需要注意这个 新的，意味着如果是对象、数组等引用类型，需要返回一个新的**)

```jsx
import React, { useState } from'react';
const [state, setState] = useState('Hello React!');

// 触发更新，直接变更成另一个状态
setState('Hello Hooks!');
// 触发更新，传递一个函数
setState(prevState => prevState +'Hooks!');
```
**简单理解，useState 用于在 React 中声明像 Vue data 选项中的属性**
- Vue: @xxx -> this.xxx = xxx -> get/set -> notify -> watcher.update -> render -> 界面更新
- React: onXxx -> setState -> React更新逻辑 -> 界面更新

```jsx
import React, { useState } from 'react';

export default function ComponentName() {
  const [name, setName] = useState('Hello React!');
  const onClick = () => {
    setName('Hello Hooks!');
  };
  return (
    <div>
      <h1>{name}</h1>
      <button onClick={onClick}>点击</button>
    </div>
  );
}
```

#### 对象的 setState
```jsx
// 扁平的对象
const [obj, setObj] = useState({
  name: 'Hello React!',
});
setObj({
  ...obj,
  name: 'Hello Hooks!',
});

// 嵌套的对象
const [obj, setObj] = useState({
  name: 'Hello React!',
  sth: 'sth',
  obj1: {
    work: '前端',
    age: 18,
  }
});

setObj({
  ...obj,
  sth: 'xxx',
  obj1: {
   ...obj.obj1,
    age: 19,
  }
});
// 一般情况下，我们应该尽量减少对象的嵌套层数，但是如果你实在不想改变对象的结构，也能简单的 setState
// 使用 Immer
// npm install use-immer
import { useImmer } from 'use-immer'
const [obj, setObj] = useImmer({
  name: 'Hello React!',
  sth:'sth',
  obj1: {
    work: '前端',
    age: 18,
  }
});

setObj(draft => {
  draft.sth = 'xxx';
  draft.obj1.age = 19;
});
```

#### 数组的 setState
需要返回一个新的数组，因此：
- `push pop shift unshift reverse sort splice` 等方法都不推荐使用，因为他们改变的是原始的数组，不会返回新的数组。
- `concat slice filter map [...arr]` 会返回新的数组，是推荐的做法。

`use-immer`依然可以很好的支持我们使用平时操作数组的方式达到更新状态的目的，因为`use-immer`会根据改动后的数组创建一个新的`state`，这就意味着我们可以尽情的使用`push pop shift unshift reverse sort splice`等方法。

```jsx
import { useImmer } from 'use-immer'
const [arr, setArr] = useImmer([1, 2, 3]);
setArr(draft => {
  draft.push(4);
  draft.splice(0, 1);
});
```

### useRef
**当你需要组件“记住”某些信息，但又不想让这些信息 触发新的渲染 时，你可以使用 useRef。**
- 使用`useRef`创建的变量，在组件的生命周期内一直存在，并且他的值具有缓存的特性，不会在每次渲染后变为初始值。
- 可以改变，并且改变不会触发组件重新渲染。
- 在一个节点中使用`ref={useRef返回的变量}`，在组件的生命周期内，`ref.current` 指向该节点`DOM`对象。

```jsx
import React, { useRef } from'react';

export default function ComponentName() {
  // 你将能够 refH1 访问到 H1 的 DOM 对象
  const refH1 = useRef();
  // 在组件的生命周期内，当你点击了changeRef按钮，执行了changeRef，ref.current 将被更新为 'Hello Hooks!'，并且不会触发组件的更新。
  const ref = useRef('Hello React!');
  const changeRef = () => {
    ref.current = 'Hello Hooks!';
  };
  // 当你点击了changeName按钮，执行了changeName，name 将被更新为 'new name'，触发组件的更新，ref.current 依然为 'Hello Hooks!'
  const [name, setName] = useState('name')
  const changeName = () => {
    setName('new name')
  };
  return (
    <div>
      <h1 ref={refH1}>{name}</h1>
      <button onClick={onClick}>changeRef</button>
      <button onClick={changeName}>changeName</button>
    </div>
  )
}
```

#### forwardRef
useRef只能用在当前组件内的节点上，那如果咱们想获取到子组件的某个节点DOM对象的引用呢？那就可以使用 forwardRef。

使用 forwardRef 包裹子组件，然后可以将父组件绑定在该子组件上的 ref 拿到，然后绑定到 子组件内的任意节点上，这样父组件的 ref 就能拿到子组件的 DOM 节点了。示例如下：
```jsx
import React, { forwardRef, useRef } from'react';

const Toolbar = forwardRef(({children}, childRef) => {
  return (
    <div className="tool-bar">
      <h2 ref={childRef}>tool-bar</h2>
      {children}
    </div>
  );
})

const Button = ({btnText, onClick}) => {
  return (
    <button onClick={onClick}>{btnText}</button>
  );
}
export default function FunctionComp() {
  const childRef = useRef()

  const handleClick = () => {
    // 打印的是 Toolbar 组件中的 h2 节点
    console.log(childRef.current)
  }
  return (
    <>
      <h1>FunctionComp</h1>
      <Toolbar ref={childRef}>
        <Button btnText="add" onClick={handleClick}></Button>
        <Button btnText="edit"></Button>
        <Button btnText="delete"></Button>
      </Toolbar>
    </>
  );
}
```

### useEffect
#### 什么是effect？
在React中，有两种逻辑：组件的渲染逻辑、事件处理程序。
#### 怎么理解？
- 组件的渲染逻辑：React组件是一个函数，这个函数的执行逻辑 就是 渲染逻辑。
- 事件处理程序：在React将组件渲染到页面之后，用户的一些操作可能会触发一些事件处理程序，比如用户点击按钮、输入框输入内容等。
#### 什么是effect？
指由渲染本身引起的，而不是由用户触发特定事件 的副作用。比如你用到了外部的一些插件（各种编辑器，图表、创建连接等），你可能需要在渲染完成之后执行这些插件的初始化逻辑，或者创建连接，这时候就可以使用 useEffect。

**不要随意在组件中使用useEffect，我们需要明确其使用场景：暂时跳出React代码，与React外部（这包括浏览器 API、第三方小部件，以及网络等等）交互。**
**如果只是想根据组件内的某些状态的变更 去改变另外的某些状态，那么你可能不需要使用useEffect。**

#### 如何使用useEffect?
```jsx
useEffect(() => {
  // do sth
  return destory // 可选
}, [dependencies])

// 没有传第二个参数，组件每次重新渲染都将执行
useEffect(() => {
  console.log('组件每次重新渲染都将执行')
})
// 传递了一个 [], 仅当第一次挂载会执行，相当于 Vue 的 mounted
useEffect(() => {
  console.log('仅当第一次挂载会执行')
}, [])
// 有具体的依赖，只有当依赖发生变化时才会执行
// 下面的例子只有当状态 name 发生变化时，才会执行
const [name, setName] = useState('name')
useEffect(() => {
  console.log('仅当 name 发生变化时，才会执行')
}, [name])

// 返回了一个函数，在组件卸载的时候执行
useEffect(() => {
  function handleScroll(e) {
    console.log(window.scrollX, window.scrollY);
  }
  // 组件第一次渲染完成后执行 mounted
  window.addEventListener('scroll', handleScroll);
  // 组件卸载的时候执行 unmounted
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

#### 使用useEffect的经典场景
- 添加事件监听
- fetch数据
- 初始化第三方插件
- 初始化设置样式、动画等

#### 不需要使用useEffect的场景
- 根据 prop 或 state 的变更，更新另外的一些state（官方文档中有几个例子很好理解）
- 能在事件处理函数中处理的，就不要拿到 useEffect 中执行，可能导致一些预期之外的bug。
- 不要把只需要执行一次，与组件的重新渲染无关的逻辑放到useEffect中。
- 不要在useEffect中通知父组件状态的变更，因为这个执行的时机太晚了。（状态变更->重新渲染->执行useEffect回调->父组件函数执行->状态变更->重新渲染）

### useLayoutEffect
useLayoutEffect 是 useEffect 的一个版本，在浏览器重新绘制屏幕之前触发，会阻塞浏览器的绘制。
```jsx
useLayoutEffect(setup, dependencies?)
```
用处：在浏览器重新绘制屏幕前计算布局，在某些计算布局的场景下使用 useEffect 可能会出现闪烁的问题，使用 useLayoutEffect 则不会。

### useMemo
组件重新渲染的时候能够缓存计算的结果，避免重复计算以提升性能。
```jsx
// 是否重新计算取决于 dependencies 是否发生变化
const cachedValue = useMemo(() => calcValue, dependencies)
```
缓存一个计算的值，并且这个计算的过程很耗时的情况下，效果会比较显著
```jsx
import React, { useMemo } from'react';

const Child = () => {
  return (<h2>Child</h2>)
}
function FunctionComp({todos, filter, name}) {
  // showChild is a memoized value, only re-evaluated when todos or filter changes
  const showChild = useMemo(() => todos.includes(filter), [todos, filter])
  return ( <>
  <div>{name}</div>
  <Child show={showChild} />
  </> );
}

export default FunctionComp;
```
也可以直接缓存一个组件/DOM元素，当且仅当这个组件/DOM元素使用到的状态变更才会重新渲染它.
```jsx
import React, { useMemo } from'react';

const Child = ({ name }) => {
  return (<h2>Child</h2>)
}
const memoChild = useMemo(() => <Child todos={todos} filter={filter} />, [todos, filter])
function FunctionComp({todos, filter, name}) {
  return ( <>
  <div>{name}</div>
  {memoChild}
  </> );
}
```

#### React.memo
`React.memo`用于缓存一个组件，只有这个组件接收的props变化时才会重新渲染它，也是`React`中的一种性能优化手段，可以避免一些组件不必要的重复渲染。举一个简单的例子：
```jsx
import React from'react';

const Child = ({childText}) => {
  console.log('Child render')
  return (<h2>{childText}</h2>)
}
// 如果此处我们不使用React.memo 包裹 Child，那么当FunctionComp组件的的任何一个props变化，都会引起Child组件的重新渲染
// 但是只有childText属性变化才会影响Child组件的渲染结果，即只有当childText属性变化才需要重新渲染
const MemoChild = React.memo(Child)

function FunctionComp({name, childText}) {
  console.log('parent render')
  return ( <>
  <div>{name}</div>
  <MemoChild childText={childText}/>
  </> );
}

export default FunctionComp;
```
`React.memo`还有第二个参数，一个函数，可由开发者自行指定是否需要重新渲染组件。
```jsx
const MemoChild = React.memo(Child, (prevProps, nextProps) => {
  return prevProps.childText === nextProps.childText
})
```

### useCallback
用于缓存函数本身，只有当依赖项变化，才会重新创建一个新的函数返回。

用法：
```jsx
const handleClick = useCallback(fn, dependencies)
```

没有使用 useCallback 的时候：
```jsx
import React from'react';

const fn = []
function FunctionComp({name, childText}) {
  const handleClick = () => {
    console.log('click' + childText)
  }
  fn.push(handleClick)
  const l = fn.length
  if(l > 1) {
    // 每次重新渲染都会返回false，handleClick都会得到一个新的函数
    console.log(fn[l - 2] === fn[l - 1])
  }
  return ( <>
  <div onClick={handleClick}>{name}</div>
  </> );
}

export default FunctionComp;
```
加上useCallback:
```jsx
import React, { useCallback } from'react';

const fn = []
function FunctionComp({name, childText}) {
  // 只有当 childText 这个 prop 变化，才会得到与之前不一致的 handleClick 函数
  const handleClick = useCallback(() => {
    console.log('click' + childText)
  }, [childText])

  fn.push(handleClick)
  const l = fn.length
  if(l > 1) {
    console.log(fn[l - 2] === fn[l - 1])
  }
  return ( <>
  <div onClick={handleClick}>{name}</div>
  </> );
}

export default FunctionComp;
```
了解了 useCallback 的作用之后，那么我们结合一下之前的 useMemo React.memo 想一下，不难猜出它们经常配合起来使用。
- React.memo 通过判断 props 是否改变 来 决定能否使用组件的缓存，props 可以传递函数吧，那假如就有函数类型的prop，如果这个 prop 没有使用 useCallback 包裹，那么每次都会返回一个新的函数，props肯定就改变了，也就导致 React.memo 无法使用组件的缓存了。
- 同样的 useMemo 不仅可以缓存普通的计算结果，也可以用于缓存组件，那么结合 useCallback 也能达到 React.memo 的组件缓存效果。

用 useMemo 实现 useCallback：
```jsx
function useCallback(fn, dependencies) {
  return useMemo(() => fn, dependencies);
}
```

### useContext
配合 createContext 使用，可以让我们在组件之间共享状态，无关组件的层级，只要在一个组件中 Provider，该组件的任意子孙组件都能通过 useContext 获取到，如下示例：

**就是Vue 中的 provider 和 inject。**

```jsx
import React, { createContext, useContext } from'react';

const ThemeContext = createContext('red')

const Toolbar = ({children}) => {
  return (
    <div class="tool-bar">
      {children}
    </div>
  );
}

const Button = ({children}) => {
  const theme = useContext(ThemeContext);
  const style = {
    color: theme,
  }
  return (
    <button style={style}>{children}</button>
  );
}

function FunctionComp() {
  return ( 
    <ThemeContext.Provider value='green'>
      <h1>FunctionComp</h1>
      <Toolbar>
        <Button>add</Button>
        <Button>edit</Button>
        <Button>delete</Button>
      </Toolbar>
    </ThemeContext.Provider>
  );
}

export default FunctionComp;
```

### useImperativeHandle
通过 useImperativeHandle 可以可以暴露一些 API 给父组件，父组件可调用，改变子组件的状态。

相当于 Vue3 的 expose。
```jsx
import React, { forwardRef, useImperativeHandle, useRef } from'react';

const Toolbar = forwardRef(({children}, childRef) => {
  const _ref = useRef()
  // 一定要注意，使用了 useImperativeHandle 给 childRef 暴露一些API,就不能再吧 childRef 绑定到 节点，绑定了也无效
  useImperativeHandle(childRef, () => {
    return {
      changeBgColor() {
        _ref.current.style.backgroundColor ='red'
      },
      $el() {
        return _ref.current
      }
    }
  })
  return (
    <div className="tool-bar">
      <h2 ref={_ref}>tool-bar</h2>
      {children}
    </div>
  );
})

const Button = ({children, onClick}) => {
  return (
    <button onClick={onClick}>{children}</button>
  );
}
export default function FunctionComp() {
  const childRef = useRef()

  const handleClick = () => {
    // 打印的是 Toolbar 组件中的 h2 节点
    console.log(childRef.current.$el())
    childRef.current.changeBgColor()
  }
  return (
    <>
      <h1>FunctionComp</h1>
      <Toolbar ref={childRef}>
        <Button onClick={handleClick}>add</Button>
      </Toolbar>
    </>
  );
}
```

### useSyncExternalStore
useSyncExternalStore 用于订阅一些外部的数据源，当数据源发生变化时，会自动重新渲染组件。比如你想获取浏览器API上的一些数据：
```jsx
import React, { useSyncExternalStore } from'react';
const subscribe = (callback) => {
  // 监听网络状态的变化
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    // 移除事件监听
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}
//  获取网络状态
const getSnapshot = () => {
  return navigator.onLine
}

export default function FunctionComp() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot)
  return ( 
      <h2>{isOnline ? 'online' : 'offline'}</h2>
  );
}
```

## 自定义Hook
与 react 内置的 Hook 一致，自定义 Hook 也以 use 开头，用于将一些需要在多个地方重复使用的逻辑封装起来，提高复用性。类似`Vue Composition API` 的 组合式函数。比如 useSyncExternalStore 的例子，我们在多个地方需要使用网络状态，那我们就可以把这个处理网络状态的逻辑封装起来，成为一个自定义的 `Hook`， 然后在需要的地方使用。

```jsx
import React, { useState, useEffect, useRef } from'react';

const subscribe = (callback) => {
  // 监听网络状态的变化
  window.addEventListener('online', callback)
  window.addEventListener('offline', callback)
  return () => {
    // 移除事件监听
    window.removeEventListener('online', callback)
    window.removeEventListener('offline', callback)
  }
}
//  获取网络状态
const getSnapshot = () => {
  return navigator.onLine
}

export default const useNetworkState = () => {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot)
  return isOnline
}
```

## 高阶组件

所谓高阶组件，就是一个函数，接收一个组件作为参数，返回一个新的组件。经常用于做属性代理。

```jsx
import React, { Component } from'react';

const Comp = () => {
  return <h1>Comp</h1>
}

const HighComp = (Comp) => {
  // 可以在这里做一些逻辑处理，比如传递一些属性给Comp, 或者添加一些样式等等
  const props = {propA: 'xxx', propB: 'yyy'}

  const styles = {
    color:'red',
  }

  return () => {
    return <Comp style={styles} {...props} />
  }
}
```


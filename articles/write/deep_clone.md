---
title: 深拷贝
author: lvzl
---

## 深拷贝
```js
/**
 * clone 要区分很多种类型
 * Undefined、Null、Boolean、Number、String、Array、Object、Function、Map、Set、WeakMap、WeakSet、Symbol、BigInt、Date、Regexp、Arguments
 * 可枚举类型：Object Array Map Set Arguments
 * 可直接赋值：'undefined', 'string','number','boolean','symbol','bigint'
 * 要特殊处理的类型 function Error
 * 这些用法需要特殊处理：new Number(2)、new String('')、new RegExp(//)、new Boolean(false)、new Date()、new Error()
 */

// while 循环更快
const foreach = (keys, cb) => {
  let i = 0
  while(i < keys.length) {
    cb(keys[i])
    i++
  }
}
// 可继续遍历
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const arguTag = '[object Arguments]'

const canFor = [ mapTag, setTag, arrayTag, objectTag, arguTag ]

// 特殊
const funcTag = '[object Function]'
const regExpTag = '[object RegExp]'
const errorTag = Error

const getType = (val) => {
  return Object.prototype.toString.call(val)
}

const isNormalType = val => {
  if (val === null) {
    return true
  }
  const typ = typeof val
  return ['undefined', 'string','number','boolean','symbol','bigint'].includes(typ)
}
/**
 * 复制一个函数
 * @param {} fn 
 */
const cloneFunction = (fn) => {
  const fnStr = fn.toLocaleString()
  if (/((function\s+)\w*\s*\()|^\(/.test(fnStr)) {
    return eval('(() => (' + fnStr + '))()')
  }
  return eval('(() => (function ' + fnStr + '))()')
}

/**
 * 比如 new Number(2)、new String('')、new RegExp()、new Boolean(false)、new Date()、new Error()
 * @param {*} fn 
 */
const cloneObjectCanNotFor = (val) => {
  const ctor = val.constructor
  let value = val.valueOf()
  if (ctor === errorTag) { // 特殊一点，获取到的信息替换一下 Error: 
    value = value.message
  }
  return new ctor(value)
}

function deepClone(val, map = new WeakMap()) {
  //  非对象类型的： string、number、boolean、symbol、bigint、null false undefined，这些可直接赋值
  if (isNormalType(val)) {
    return val
  }
  // 接下来都是 typeof 为 object ，先获取具体的类型
  const typ = getType(val)

  if (map.has(val)) {
    return map.get(val)
  }

  // function
  if(typ === funcTag) {
    return cloneFunction(val)
  }

  let res
  
  // 可枚举的
  if(canFor.includes(typ)) {
    if(typ === objectTag || typ === arrayTag || typ === arguTag) {
      res = Array.isArray(val) ? [] : {}
      const keys = Object.keys(val)
      foreach(keys, key => {
        res[key] = deepClone(val[key], map)
      })
    } else if (typ === setTag) {
      res = new Set()
      val.forEach(s => {
        res.add(deepClone(s))
      })
    } else if (typ === mapTag) {
      res = new Map()
      val.forEach(mapkey => {
        res.set(mapkey, deepClone(val.get(mapkey)))
      })
    }
    map.set(val, res)
  } else {
    return cloneObjectCanNotFor(val)
  }
  return res
}

// Undefined、Null、Boolean、Number、String、Array、Object、Function、Map、Set、WeakMap、WeakSet、Symbol、BigInt、Date、Regexp、Arguments
const obj = {
  a: null,
  b: undefined,
  c: [1,2,3],
  d: false,
  e: true,
  f: 33444,
  g: '46576',
  i: {aa: '', bb: 3},
  j() {},
  h: new Map().set({}, 2),
  k: new Set().add(344, 'ee'),
  l: Symbol('d'),
  m: BigInt(12346575),
  n: new Date('2023-01-01'),
  o: new Error('haha'),
  p: () => { console.log('jiantouhanshu') },
  r: new RegExp('function')
}

const f = deepClone(obj)
```
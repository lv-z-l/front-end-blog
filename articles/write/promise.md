---
title: 手写Promise
author: lvzl
---

## 还不知道Promise是啥?

[还不知道Promise是啥?](https://es6.ruanyifeng.com/#docs/promise)

## 参考文章

[还不知道Promise是啥?](https://es6.ruanyifeng.com/#docs/promise)

[可能是目前最易理解的手写promise](https://mp.weixin.qq.com/s?__biz=Mzg5ODA5NTM1Mw==&mid=2247491089&idx=1&sn=b8438de4c73ee63cd63ac5c387cb9882&chksm=c0669f87f71116912be196c1647a116943b7094ed703b053de73b436b4ff5794dd5679a15d42&scene=126&sessionid=1606701356&key=2f88c2a11d638eeaa83c5879f86ff41202267f8f360266f330e21fe072a3c2d04052ecebb16551de7880fac2ad0cc30ca85a917b4e98a9c70918a7e206866cdaf9475f0d4e276b3ca836ba1c1ad180d44b161ba1c090e2a4cc4bb1c68a44a66cea4206265322bcedf76ecc7029d61ae347b3ebed2c446ba5fcc387e17e541fb6&ascene=1&uin=MjMzNzAxMDkzNw%3D%3D&devicetype=Windows+10+x64&version=63000039&lang=zh_CN&exportkey=A1Ot2vyhOiVqy6ihVgJ3U8I%3D&pass_ticket=eQePtr0tNUzhhxcPnj9u5aHLJDvq%2F%2BbYxy3WDIUlBpI77NbsV1S3e%2Ffau5d86B1f&wx_header=0)

[手写一个Promise/A+,完美通过官方872个测试用例](https://juejin.cn/post/6844904116913700877#heading-21)

```js
function Promise(fn) {
  this.state = 'pending' // 状态
  this.res = undefined   // 成功的返回值
  this.err = undefined   // 失败的返回值
  this.fn1Callbacks = []
  this.fn2Callbacks = []

  const resolve = value => {
    setTimeout(() => {
      if (this.state === 'pending') {
        this.state = 'resolved'
        this.value = value
        for (let i = 0; i < this.fn1Callbacks.length; i++) {
          this.fn1Callbacks[i](value);
        }
      }
    })
  }
  const reject = error => {
    setTimeout(() => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.err = error
        for (let i = 0; i < this.fn2Callbacks.length; i++) {
          this.fn2Callbacks[i](error);
        }
      }
    })
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }

}

function resolvePromise(otherPromise, x, resolve, reject) {
  if (otherPromise === x) {
    return reject(new Error('promise loop'))
  }
  if (x instanceof Promise) {
    x.then(value => {
      resolve(value)
    }, error => {
      reject(error)
    })
    return
  }
  if (x instanceof Object || typeof x === 'function') {
    try {
      const then = x.then
      let called

      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) {
            return
          }
          called = true
          return resolvePromise(otherPromise, y, resolve, reject)
        }, r => {
          if (called) {
            return
          }
          called = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (error) {
      if (called) {
        return
      }
      reject(error)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.then = function (fn1, fn2) {
  const _this = this
  let otherpro
  fn1 = typeof fn1 === 'function' ? fn1 : function (value) { }
  fn2 = typeof fn2 === 'function' ? fn2 : function (error) { }
  if (this.state === 'resolved') {
    return otherpro = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const x = fn1(_this.value)
          resolvePromise(otherpro, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  } else if (this.state === 'rejected') {
    return otherpro = new Promise(function (resolve, reject) {
      setTimeout(() => {
        try {
          const x = fn2(_this.err)
          // reject(x)
          resolvePromise(otherpro, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  } else {
    return otherpro = new Promise(function (resolve, reject) {
      _this.fn1Callbacks.push(function () {
        try {
          const x = fn1(_this.value)
          // resolve(x)
          resolvePromise(otherpro, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
      _this.fn2Callbacks.push(function () {
        try {
          const x = fn2(_this.err)
          // reject(x)
          resolvePromise(otherpro, x, resolve, reject)
        } catch (error) {
          reject(error)
        }
      })
    })
  }

}

Promise.prototype.catch = function (fn) {
  this.then(null, fn)
}

Promise.prototype.finally = function (fn) {
  return this.then(res => {
    return new Promise(resolve => {
      resolve(fn())
    }).then(() => {
      return res
    })
  }).catch(err => {
    return new Promise(resolve => {
      resolve(fn())
    }).then(() => {
      throw err
    })
  })
}

Promise.resolve = function (params) {
  if (params instanceof Promise) {
    return params
  }
  return new Promise(function (resolve) {
    resolve(params)
  })
}

Promise.reject = function (err) {
  return new Promise(function (resolve, reject) {
    reject(err)
  })
}

Promise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    if (!promises || !Array.isArray(promises)) {
      reject('promises must be a array')
    }
    if (promises.length === 0) {
      return resolve([])
    }
    const data = []
    let num = 0
    promises.forEach(item => {
      item.then(res => {
        data.push(res)
        num++
        if (num === promises.length) {
          resolve(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}

Promise.race = function (promises) {
  return new Promise(function (resolve, reject) {
    if (!promises || !Array.isArray(promises)) {
      reject('promises must be a array')
    }
    if (promises.length === 0) {
      return resolve()
    }
    promises.forEach(item => {
      item.then(res => {
        data.push(res)
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  })
}




new Promise((resolve, reject) => {
  resolve('aaa')
}).then(val => {
  console.log(val)
}).finally(val => {
  console.log(val)
  setTimeout(() => {
    console.log(val)
  })
})
```
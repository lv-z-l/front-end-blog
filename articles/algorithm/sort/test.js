// new Promise((res, rej) => {

// })

const resolvePromise = (promise, x, res, rej) => {
  if (x === promise) return new Error('cycle call on same promise')

  if (x instanceof MPromise) {
    x.then(
      data => res(data),
      err => rej(err)
    )
    return
  }

  if (x !== null && typeof x === 'object' && typeof x.then === 'function') {
    let called
    try {
      x.then(
        y => {
          if (called) {
            return
          }
          called = true
          resolvePromise(promise, y, res, rej)
        },
        err => {
          if (called) {
            return
          }
          called = true
          rej(err)
        }
      )
    } catch (error) {
      if (called) {
        return
      }
      rej(error)
    }
    return
  }
  res(x)
}
class MPromise {
  constructor(fn) {
    // pending、rejected、fulfilled
    this.state = 'pending'
    // 存resolve的数据
    this.data = null
    // 存失败的数据
    this.err = null
    // then的回调
    this.callbacks = []
    // 失败的回调
    this.errCallbacks = []
    try {
      const res = MPromise.resolve.bind(this)
      const rej = MPromise.reject.bind(this)
      fn(res, rej)
    } catch (error) {
      rej(error)
    }
  }
  // 返回新的Promise
  then(cb, errCb) {
    const _this = this
    cb = cb || (() => {})
    errCb = errCb || (() => {})
    let res
    if (this.state === 'fulfilled') {
      return (res = new MPromise((res, rej) => {
        try {
          const x = cb(_this.data)
          resolvePromise(res, x, res, rej)
        } catch (err) {
          rej(err)
        }
      }))
    } else if (this.state === 'rejected') {
      return (res = new MPromise((res, rej) => {
        try {
          const x = errCb(_this.err)
          resolvePromise(res, x, res, rej)
        } catch (err) {
          rej(err)
        }
      }))
    } else {
      return (res = new MPromise((res, rej) => {
        this.callbacks.push(data => {
          try {
            const x = cb(data)
            resolvePromise(res, x, res, rej)
          } catch (err) {
            rej(err)
          }
        })
        this.errCallbacks.push(err => {
          try {
            const x = errCb(err)
            resolvePromise(res, x, res, rej)
          } catch (err) {
            rej(err)
          }
        })
      }))
    }
  }
  // 返回新的Promise
  catch(cb) {
    return new MPromise().then(null, cb)
  }
  finally() {}
  /**
   * 全部都要成功
   */
  static all() {}
  /**
   * 可能包括成功的、也可能包括失败的
   */
  static allSettled() {}

  static race() {}
  static resolve(data) {
    if (this instanceof MPromise) {
      if (this.state === 'pending') {
        this.state = 'fulfilled'
        this.data = data
      }
      const callback = this.callbacks.shift()
      while (callback) {
        setTimeout(() => callback(err))
      }
      return
    } else if (data instanceof MPromise) {
      return data.then(MPromise.resolve.bind(data), MPromise.reject.bind(data))
    }
    return new MPromise((res, rej) => res(data))
  }
  static reject(error) {
    if (this instanceof MPromise) {
      setTimeout(() => {
        if (this.state === 'pending') {
          this.state = 'rejected'
          this.err = error
          const errCallback = this.errCallbacks.shift()
          while (errCallback) {
            errCallback(err)
          }
        }
      })
      return
    }
    return new MPromise((res, rej) => rej(error))
  }
}

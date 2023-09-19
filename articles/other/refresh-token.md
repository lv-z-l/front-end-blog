---
title: 自动刷新token
author: lvzl
---

拦截器处理token过期的请求
```js
import { refreshToken, isRefreshToken } from './refresh-token'
import { getRefreshToken } from './xxx'

const instance = axios.create();

instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    if(response.hearders.authorization) { // 有token，就更新token
      setToken()
    }
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.response.status === '401' && !isRefreshToken(error.config)) { // 代表过期了，这里要排除刷新token的请求
      const refreshRes = await refreshToken()
      if(refreshRes) {
        error.config.Authorization = 'Bearer ' + getRefreshToken() // 一定要获取新的token，更新之前失败请求的token
        const res = await instance(error.config)
        return res
      }
    }
    return Promise.reject(error);
  });
```

封装重新请求的逻辑
```js
import { getRefreshToken } from './xxx' // 从缓存、或者哪里获取刷新token，要考虑不存在的情况

export function isRefreshToken(config) { // 用于判断是否是刷新token的请求
  return config.__isRefreshToken
}

let refreshTokenPromise // 这个是为了防止多个请求失败，引起了多次的刷新token调用

export function refreshToken() {
  if(refreshTokenPromise) return refreshTokenPromise
  refreshTokenPromise = new Promise(async (res, rej) => {
      const res = await instance.get('/oauth/refreshtoken', {
      hearders: { Authorization: 'Bearer ' + getRefreshToken()},
      __isRefreshToken: true
    })
    res(isSuccess(res.code))
  })
  refreshTokenPromise.finally(() => {
    refreshTokenPromise = null
  })
}

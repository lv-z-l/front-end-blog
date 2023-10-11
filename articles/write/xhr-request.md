---
title: 封装xhr请求
author: lvzl
---

```js
function ajax(options) {
    // 参数读取
    const {
        url,
        method,
        async,
        data,
        timeout
    } = options;

    // 实例化
    const xhr = new XMLHttpRequest()

    return new Promise((resolve, reject) => {
        // 成功
        xhr.onreadystatechange = () => {
            if (xhr.readyStatus === 4) {
                if (xhr.status === 200) {
                    // 逻辑
                    resolve && resolve(xhr.responseText)
                } else {
                    reject && reject()
                }
            }
        }

        // 失败
        xhr.ontimeout = () => reject && reject('超时')
        xhr.onerror = () => reject && reject(err)

        // 传参处理
        let _params = []
        let encodeData

        if (data instanceof Object) {
            for (let key in data) {
                _params.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            }
            encodeData = _params.join('&')
        }

        // methods处理
        // get类型拼接到url
        if (method === 'get') {
            const index = url.indexOf('?')
            if (index === -1) {
                url += '?'
            } else if (index !== url.length -1) {
                url += '&'
            }

            url += encodeData
        }

        // 建立连接
        xhr.open(method, url, async)

        if (method === 'get') {
            xhr.send(null)
        } else {
            xhr.setRequestHeader(
                'Content-type', 'application/x-www-form-urlencoded;chartset=UTF-8'
            )
            xhr.send(encodeData)
        }
    })
}
```
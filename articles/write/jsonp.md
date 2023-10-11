---
title: jsonp
author: lvzl
---

```js
function jsonp(url, data, callback) {
  const symbol = 'jsonp' + Date.now()
  const script = document.createElement('script')

  let src = url.includes('?') ? src : url + '?'
  let params
  const dataKeys = Object.keys(data)
  if(data && dataKeys.length > 0) {
    params = dataKeys.map(key => `${key}=${encodeURIComponent(data[key])}`).join('&') + '&callback=' + symbol
  } else {
    params = 'callback=' + symbol
  }

  src += params

  window[symbol] = function(data) {
    delete window[symbol]
    document.removeChild(script)
    callback(data)
  }
  
  script.src = src
  document.body.appendChild(script)
}
```
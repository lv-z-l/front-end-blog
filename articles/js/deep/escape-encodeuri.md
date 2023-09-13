---
title: escape、encodeURI、encodeURIComponent的区别
author: lvzl
---

`escape()`, `encodeURI()`, 和 `encodeURIComponent()` 都是用于在 JavaScript 中处理字符串的方法，但它们的作用和用法有一些不同。

1. `escape()`
   - `escape()` 方法用于对字符串进行编码，将非 ASCII 字符和某些特殊字符转换为 `%` 后跟两位十六进制表示的字符。
   - 该方法已被废弃，不推荐使用，因为它不会对所有字符进行正确编码，而且在处理 URI 和 URL 时存在问题。通常，应该使用 `encodeURI()` 或 `encodeURIComponent()` 来代替。

```javascript
var originalString = "你好，world!";
var encodedString = escape(originalString);
console.log(encodedString); // "%u4F60%u597D%uFF0Cworld%21"
```

2. `encodeURI()`
   - `encodeURI()` 方法用于对整个 URI 进行编码，它将字符串中的特殊字符进行编码，但保留某些字符（例如 `/`, `:`, `?`, `&`, `=`）不编码，以便构建有效的 URI。
   - 这个方法通常用于编码整个 URI，而不是单独的参数值。

```javascript
var uri = "https://www.example.com/search?query=你好";
var encodedURI = encodeURI(uri);
console.log(encodedURI); // "https://www.example.com/search?query=%E4%BD%A0%E5%A5%BD"
```

3. `encodeURIComponent()`
   - `encodeURIComponent()` 方法用于对 URI 组件中的特殊字符进行编码，包括 `/`, `:`, `?`, `&`, `=`, 空格等。这个方法通常用于编码单独的参数值，以确保参数值不会破坏 URI 的结构。

```javascript
var paramValue = "你哈:?&/=";
var encodedParamValue = encodeURIComponent(paramValue);
console.log(encodedParamValue); // '%E4%BD%A0%E5%93%88%3A%3F%26%2F%3D'
```

总结：

- `escape()` 已被废弃，不应再使用。
- `encodeURI()` 用于编码整个 URI，通常用于整个 URL 的编码，保留某些字符（例如 `/`, `:`, `?`, `&`, `=`）不编码。
- `encodeURIComponent()` 用于编码 URI 组件中的特殊字符，通常用于单独的参数值的编码。

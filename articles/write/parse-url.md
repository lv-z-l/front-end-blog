---
title: 解析URL
author: lvzl
---

```js
// 要解析的URL
var urlString = "https://www.example.com:8080/path/to/resource?param1=value1&param2=value2#section3";

// 创建一个URL对象
var url = new URL(urlString);

// 获取各个部分
var protocol = url.protocol; // 协议（包括冒号）：https:
var host = url.host; // 主机名（包括端口号）：www.example.com:8080
var hostname = url.hostname; // 主机名：www.example.com
var port = url.port; // 端口号：8080
var pathname = url.pathname; // 路径：/path/to/resource
var search = url.search; // 查询参数（包括问号）：?param1=value1&param2=value2
var hash = url.hash; // 片段标识符（包括井号）：#section3
var searchParams = url.searchParams; // 查询参数的键值对对象

// 输出各个部分
console.log("协议: " + protocol);
console.log("主机名: " + host);
console.log("主机名 (不包括端口号): " + hostname);
console.log("端口号: " + port);
console.log("路径: " + pathname);
console.log("查询参数: " + search);
console.log("片段标识符: " + hash);

// 输出查询参数的键值对
searchParams.forEach(function(value, key) {
    console.log("查询参数 " + key + ": " + value);
});

```

---
title: http 响应状态码
author: lvzl
---

HTTP 请求状态码是 Web 服务器向客户端返回的 3 位数字代码，用于指示 HTTP 请求的结果和状态。这些状态码分为五个不同的类别，每个类别具有特定的含义。以下是一些常见的 HTTP 请求状态码和它们的含义：

1. **1xx（信息性状态码）**：这些状态码表示请求已被接收，继续处理。

   - **100 Continue**: 服务器正在等待继续的请求头。客户端可以发送请求的主体部分。

2. **2xx（成功状态码）**：这些状态码表示请求已成功被服务器接收、理解、并接受。

   - **200 OK**: 请求成功，服务器已经返回请求的资源。
   - **201 Created**: 请求已成功，并且服务器创建了新的资源。
   - **204 No Content**: 请求成功，但服务器没有返回任何内容。

3. **3xx（重定向状态码）**：这些状态码表示客户端需要执行额外的操作以完成请求。

   - **301 Moved Permanently**: 资源已永久移动到新位置，客户端应该更新其链接。
   - **302 Found**: 资源临时移动到新位置，客户端应该使用新位置重新发起请求（有时用于实现重定向）。
   - **304 Not Modified**: 资源未被修改，客户端可以使用缓存的内容。

4. **4xx（客户端错误状态码）**：这些状态码表示客户端发送的请求有误，服务器无法处理。

   - **400 Bad Request**: 请求语法或参数错误，服务器无法理解。
   - **401 Unauthorized**: 请求未进行身份验证或身份验证失败。
   - **403 Forbidden**: 服务器拒绝了请求，通常因为权限不足。
   - **404 Not Found**: 请求的资源在服务器上未找到。
   - **405 Method Not Allowed**: 请求使用了不被允许的 HTTP 方法。

5. **5xx（服务器错误状态码）**：这些状态码表示服务器在处理请求时发生了错误。

   - **500 Internal Server Error**: 服务器遇到了意外的错误，无法完成请求。
   - **502 Bad Gateway**: 服务器作为网关或代理，从上游服务器接收到无效响应。
   - **503 Service Unavailable**: 服务器暂时不可用，通常是由于维护或过载。
   - **504 Gateway Timeout**: 服务器作为网关或代理，从上游服务器没有及时收到响应。

这些 HTTP 状态码是 HTTP 协议的一部分，用于在客户端和服务器之间传递关于请求和响应状态的信息。它们帮助开发人员和系统管理员了解请求的结果以及如何处理它们。当开发 Web 应用程序时，理解这些状态码是非常重要的，因为它们可以帮助您调试和解决问题。
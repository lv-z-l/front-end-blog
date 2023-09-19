---
title: 网络安全之CSRF攻击
author: lvzl
---

## 是什么

CSRF（Cross-site request forgery）跨站请求伪造：攻击者**诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求**。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

一个典型的 CSRF 攻击有着如下的流程：

1. 受害者登录 a.com，并保留了登录凭证（Cookie）。
2. 攻击者引诱受害者访问了 b.com。
3. b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会…
4. a.com 接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
5. a.com 以受害者的名义执行了 act=xx。
6. 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让 a.com 执行了自己定义的操作。

## 特点是什么

1. CSRF（通常）发生在第三方域名。
2. CSRF 攻击者不能获取到 Cookie 等信息，只是使用。
3. 通常是跨域请求

## 有哪些类型

### GET 类型的 CSRF

```html
 <img src="http://bank.example/withdraw?amount=10000&for=hacker" >
```
访问含有这个 img 的页面后，浏览器会自动向`http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker`发出一次 HTTP 请求。bank.example 就会收到包含受害者登录信息的一次*跨域请求*。

### POST 类型的 CSRF

```html
 <form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script>

```

访问该页面后，表单会自动提交，相当于模拟用户完成了一次 POST 操作。

### 链接类型的 CSRF

```html
  <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
  <a/>

```

需要点击才会中招。

## 如何防范

1. 同源检测，通过请求头中的 origin、referer 确定域名是否是合法的域名，外域直接禁止。但在某些场景可能两者都获取不到，这种情况建议直接禁止；还有可能 referer 被修改，并不太可靠。
2. CSRF Token
  - 用户登录以后 -> 加密算法对数据进行加密生成 token，并将用户信息放到 session -> 返回给前端，但是不能放到 cookie 了
  - 用户请求，带上这个 token -> 服务器解密这个 token，并从 session 取出用户信息比对，看是否一致。不过针对那种 标签上的 href、src 等请求，就需要开发人员手动设置上 token
  - 这种方式 session 默认存储在单机服务器内存中，只能运用在单机的服务器上，不适用于分布式的服务。
  - 读取和验证CSRF Token会引起比较大的复杂度和性能问题
3. 分布式校验
  - 服务器通过一种加密算法根据用户信息得到一个token（userinfo.签名），保证签名不容易被破解，不再往 session 存 token
  - 请求携带过来的token，拿到 userinfo，只需要再按同样的加密算法计算一次，比较与携带过来的是否一致，即可得出是不是伪造的token
  - 比较可靠
4. 双重cookie验证，双重Cookie采用以下流程：
  - 在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串（例如csrfcookie=v8g9e4ksfhw）。
  - 在前端向后端发起请求时，取出Cookie，并添加到URL的参数中（接上例POST https://www.a.com/comment?csrfcookie=v8g9e4ksfhw）。
  - 后端接口验证Cookie中的字段与URL参数中的字段是否一致，不一致则拒绝。
  - 安全性还是没有CSRF Token高
5. sameSite 设置为 strict，表明这个 Cookie 在任何情况下都不可能作为第三方 Cookie，绝无例外。

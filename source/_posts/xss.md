---
title: xss
date: 2017-09-06 13:29:17
tags: [xss]
category: web安全
---

## XSS分为三大类型： 反射型、存储型、DOM XSS。

### 反射型：
    在发出请求时，XSS代码出现在URL中，作为输入提交到服务端，服务端解析后响应，在响应内容中出现这段XSS 代码，最后浏览器解析执行，这个过程就像一次反射，所以成为XSS。
    如，在客户端请求  `http://www.foo.com/xss?x=<script>alert(1)</script>`，如果服务端不经过任何过滤，直接输出，那么响应体中就会包含这段代码，然后浏览器就会解析执行触发。

### 存储型：
  存储型XSS与反射型XSS很像，不过XXS代码会在服务端存储，下次请求目标页面时不用再提交XSS代码，每次浏览器发来请求时，都会返回XSS代码，比如一般的论坛评论或留言板功能，在每次用户查看留言板时，留言内容都会从数据库查询出来并显示，浏览器将XSS代码当作正常HTML与JS解析执行，于是就触发了XSS攻击。

### DOM XSS
  DOM XSS 与反射型和存储型XSS攻击的不同之处在于，DOM XSS 的代码并不需要服务器解析响应，触发XSS只靠浏览器端的DOM 解析，可以认为完全是客户端的事情。
####  常见的DOM  XSS 输入点有：
  document.URL
  document.URLUnencoded
  document.location（以及其属性）
  document.referrer
  window.location（以及其属性）
  window.name
  xhr请求回来的数据
  document.cookie
  表单项的值

####  常见的输出点有：
  直接输出HTML内容，如：
  document.write()
  document.writeIn()
  document.body.innerHtml = ...
#### 直接修改DOM树（包括DHTML时间），如：
  document.forms[0].action = （或其他对象的 src 、href）
  document.attachEvent()
  document.create()
  document.execCommand()
  document.body（直接通过body对象访问DOM）
  window.attachEvent()
####  替换document URL 如：
  document.location = （或直接赋值给location.href、host、hostname属性）
  document.location.hostname = ...
  document.location.replace()
  document.location.assign()
  document.URL = ...
  window.navigate()
#### 打开或修改新窗口：
  document.open()
  window.open()
  window.location.href = ...
####  直接执行脚本，如;
  eval()
  window.execScript()
  window.setInterval()
  window.setTimeout()

# 浏览器工作原理 | HTTP协议+词法语法分析（一）

### 一个经典面试题
概括当我们在浏览器输入一个URL敲回车到看到网页发生了什么？
1. URL经过HTTP请求返回的主体是HTML代码
2. 对HTML代码进行parse解析得到DOM树
3. css computing应用到Dom树，得到DOM with CSS
4. layout排版，得到元素带位置的DOM（DOM with position）
5. render得到Bitmap

### ISO-OSI七层网络模型：
<escape>
<table>
<th colspan="2">ISO-OSI七层网络模型</th>
<tr><td>应用</td><td rowspan="3">HTTP<br><i>require("http")</i></td></tr>
<tr><td>表示</td></tr>
<tr><td>会话</td></tr>
<tr><td>传输</td><td>TCP<br><i>require("net")</i></td></tr>
<tr><td>网络</td><td>Internet</td></tr>
<tr><td>数据链路</td><td rowspan="2">4G/5G/WIFI</td></tr>
<tr><td>物理层</td></tr>
</table>   
</escape>

### TCP与IP的一些基础知识：
TCP
* 流
* 用端口标识
* Node里访问：require('net')

IP
* 包
* 用IP地址标识
* Node无法访问，只能用C++访问 *（libnet/libpcap库）*

IP层会收到很多不属于本机的包；TCP层假设IP层已经让机器间联通了，可靠流式传输，收不到会重发，端口用来标识应用。

### HTTP
在TCP基础上规定了Request和Response模型，必须是一问一答且是先问后答，与TCP的双向通道不同。服务端不能主动Response。
![](https://static001.geekbang.org/resource/image/3d/a1/3db5e0f362bc276b83c7564430ecb0a1.jpg)
* Request
    |Request|组成结构|
    |--|--|
    |`POST / HTTP/1.1`|**Request line** 构成分别是HTTP Method + 请求的路径 + 请求的协议和版本|
    |`Host: 127.0.0.1`<br>`Content-Type: application/x-www-form-urlencoded`| **headers**|
    ||`\r\n`空行分割|
    |`field1=aaa&code=x%3D1`|**body**|

* Response
    |Response|组成结构|
    |--|--|
    |`HTTP/1.1 200 OK`|**status line** 构成分别是协议和版本 + 状态码 + 状态|
    |`Content-Type: text/html`<br>`Date: Tue, 12 May 2020 10:53:59 GMT`<br>`Connection: keep-alive`<br>`Transfer-Encoding: chunked`|**headers**|
    ||`\r\n`空行分割|
    |`26`<br>`<html><body>Hello World</body></html>`<br><br>`0`<br>|**body** 根据`Transfer-Encoding`的值解析，<br>chunked的方式是表示字符数量的数字+换行+字符|
[HTTP标准参考文档](https://tools.ietf.org/html/rfc2616)




### 答疑：
【概念了解】[CSS Houdini](https://developer.mozilla.org/zh-CN/docs/Web/Houdini) 是一组底层API，它们公开了CSS引擎的各个部分，从而使开发人员能够通过加入浏览器渲染引擎的样式和布局过程来扩展CSS。非常强大，能用javascript定制所有CSS的功能，能接管文首[经典面试题](#一个经典面试题)的3、4、5步骤。

[//]: # (名词查询：结构化编程：面向过程、面向对象、函数式编程)
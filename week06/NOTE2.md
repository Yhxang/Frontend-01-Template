# 用有限状态机实现HTML的分析

在HTML标准的[章节12.2.5](https://html.spec.whatwg.org/multipage/parsing.html#tokenization)中，已经规定了HTML的状态共80种，去除掉CDATA state、RCDATA state、Script state、Comment state、DOCTYPE state等，我们先挑选其中一部分状态，完成一个最简版本的ToyBrowser的HTML解析。

关于解析HTML中的各种状态，HTML文档写的比较清晰，已经近似于伪代码。
下面的代码为例
```html
<html maaa=a >
<head>
    <style>
body div #myid{
    width:100px;
    background-color: #ff5000;
}
body div img{
    width:30px;
    background-color: #ff1111;
}
    </style>
</head>
<body>
    <div>
        <img id="myid"/>
        <img />
    </div>
</body>
</html>
```
初始为

文档中遇到Reconsume这个词会进入tagname(c)状态
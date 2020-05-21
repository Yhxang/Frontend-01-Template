## 用有限状态机实现HTML的分析

在HTML标准的[章节12.2.5](https://html.spec.whatwg.org/multipage/parsing.html#tokenization)中，已经规定了HTML的状态共80种，去除掉CDATA state、RCDATA state、Script state、Comment state、DOCTYPE state等，我们先挑选其中一部分状态，完成一个最简版本的ToyBrowser的HTML解析。

关于解析HTML中的各种状态，HTML文档写的比较清晰，已经近似于伪代码。


## CSS parser
CSS parse 涉及很多编译原理知识，因此暂不做分析，直接用[CSS parser](https://www.npmjs.com/package/css)来解决。

## CSS computing得到DOM with CSS

### Step 1. 收集CSS规则  
* 遇到style标签时，把CSS规则保存起来  
* 调用[CSS parser](https://www.npmjs.com/package/css)来分析CSS规则

### Step 2. 添加调用
* 创建一个元素后，立即计算CSS
* 理论上，当我们分析一个元素时，所有的CSS规则已经收集完毕
* 在真实浏览器中，可能遇到写在body的style标签，需要重新计算CSS的情况
重新CSS计算，必然会造成重排，重排一定触发重绘

### Step 3. 获取父元素序列
* 在computeCSS函数中，我们必须知道元素的所有父元素才能判断元素与规则是否匹配
* 从HTML parser中的stack，可以获取本元素所有的父元素
* 因为首先获取的是“当前元素”，所以获得和计算元素的顺序是从内向外

举例`div div #myid`这个CSS规则，#myid一定是当前元素：
|`div div`|`#myid`|
|--|--|
|不知道匹配哪个父元素|一定匹配当前元素|

### Step 4. 拆分选择器
* 选择器也要从当前元素向外排列
* 复杂选择器拆成针对单个元素的选择器，用循环匹配父元素队列

### Step 5. 计算选择器与元素匹配
* 根据选择器的类型和元素属性，计算是否与当前元素匹配
* 实际浏览器中还要处理复合选择器

作业可选：实现复合选择器，实现支持空格的选择器

### Step 6. 生成computed属性
* 一旦选择匹配，就应用选择器到元素上，形成computedStyle

#### [CSS Selector Specificity（优先级）](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Specificity)
```html
<style>
div.contenter a.x#y{
    color: yellow;
}
body div a.x#y{
    color: green;
}
</style>
<body>
    <div class="container">
        <a class="x" id="y"></a>
    </div>
</body>
```
每条css rule优先级可以看做一个四元数组，第一位（高位）是行内样式，第二位是id，第三位是类，第四位是标签：   

例如`body div a.x#y`优先级为`[0,1,1,3]`，`div.contenter a.x#y`优先级为`[0,1,2,2]`，比较优先级时先比较高位，如果高位大小有结果，优先级便有结果了，高位优先级一致则比较次高位，如果完全由一致，后面的规则覆盖前边的规则。

important并不是第五个优先级，而是简单分成带不带important的两组，带important的永远覆盖不带的，实践中不允许用于日常开发（只允许用于hotfix）。

## 答疑：
* 真实的浏览器也是先获得所有的css规则再匹配，而不是一边获得一边匹配。

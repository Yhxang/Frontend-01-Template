# 毕业总结

21周的前端训练课程即将结束，这几个月里，跟着winter老师成体系的重学了一遍前端，不仅学习到了知识，开阔了眼界，最重要的是学到了如何学习前端的方法，明白了自己到底什么地方需要努力。

## 总结课程知识点：
### 学习方法
* [前端知识体系脑图](../week01/xmind.png)
* 溯源法
* 整理法

### [编程语言通识](../week02/NOTE1.md)

* [产生式](../week02/NOTE1.md#2-%E4%BA%A7%E7%94%9F%E5%BC%8Fbnf2)  
* 练习：  
    1. [num_reg.js](../week02/num_reg.js) 根据文档写一个正则表达式，匹配所有 Number直接量
    2. [string_reg.js](../week02/string_reg.js) 写一个正则表达式，匹配所有的字符串直接量，单引号和双引号
    3. [utf8_encoding.js](../week02/string_reg.js) 写一个 UTF-8 Encoding 的函数
* 收获：
    > 理解了产生式，学会看懂[ECMAScript 262 文档](https://www.ecma-international.org/publications/standards/Ecma-262.htm)中的语法规定部分。

### Javascipt语言设计
* [词法 类型](../week02/NOTE2.md)
* [表达式 Expression](../week03/NOTE.md)
    * 练习：
        1. [convertStringToNumber.js](../week03/StringToNumber.js) 将Number字面量转化为Number
        2. [convertNumberToString.js](../week03/NumberToString.js) 将Number转化为Number字面量
* [语句 Statement](../week03/NOTE2.md)
    * 练习：
        1. [Javascript标准里所有对象中我们无法实现的对象](../week03/SpecialObject.md)
* [结构化 Structure](../week04/NOTE.md)
    * 宏任务微任务
    * [使用 G6 antv 可视化Realm中所有对象](../week05/realm.md)

### 浏览器工作原理
* [我们在浏览器输入一个URL敲回车到看到网页发生了什么？](../week05/NOTE.md#一个经典面试题)
* [HTTP协议+词法语法分析](../week05/NOTE.md)
* [HTML Paser 使用**有限状态机**实现HTML的分析](./week06/NOTE.md)
    1. 通过状态机将字符串解析成DOM树
    2. 练习：[使用状态机匹配字符串](../week06/match.js)
    3. 基于KMP的FSM处理 pattern
* [CSS Computed](../week06/NOTE2.md)
    * CSS 计算得出 DOM with CSS
* [CSS Layout, Render](../week07/NOTE.md)
    * 使用flex布局，得出DOM with position，使用Image库最终渲染成一张位图

#### 完整项目代码：
[Toy-browser](../week07/toy-browser)

### CSS
[CSS rule 脑图](../week07/CSS-xmind.png)
* [CSS基本语法,CSS基础机制](../week07/NOTE.md#重学css)
* [CSS基本语法,排版与相关属性](../week08/NOTE.md)
    *  练习：[match.js](../week08/match.js) 匹配复杂选择器的match函数
* [动画与绘制，渲染与颜色](../week09/NOTE.md)

### HTML

* [HTML语言与扩展，语义](../week09/NOTE.md)

### 浏览器
* [DOM API，事件机制](../week09/NOTE.md#重学dom)
* [Range API，CSSOM](../week10/NOTE.md)
* [Browser API](../week09/Browser_API.xmind)

### 编程与算法实践
* Tic Tac Toe
    * [完整项目代码](../week10/TicTacToe.html)
* [寻路算法](../week11/NOTE.md)
    * [项目代码-A star启发式算法、BFS（广度优先）](../week11/road.html)    
    * [项目代码-使用 Binary Heap（二叉堆）算法](../week11/road_binaryHeap.html)
    * [项目代码-使用 Deep First（DFS 深度优先）算法](../week11/road_deepFirst.html)
* [解析四则运算表达式](../week12/NOTE.md)
    * [项目代码-使用LL算法](../week12/LL.html)
    * [项目代码-使用状态机](../week12/LL_state.html)
* [字符串算法](../week12/NOTE.md#字符串分析算法)
    * Trie 字典树
        * [完整项目代码](../week12/Trie.html)
    * KMP
        * [完整项目代码](../week12/kmp.html)
    * wildcard
        * [完整项目代码](../week12/wildcard.html)
    * Proxy 与双向绑定
        * [完整项目代码](../week13/proxy.html)
    * 使用Range实现DOM精确操作
        * [完整项目代码](../week13/dragdrop.html)
### 组件化
* [Vue风格的SFC](../week15/NOTE.md)
* [动画库](../week15/NOTE.md#组件化--动画)
* [手势库](../week16/NOTE.md)
####  完整项目代码
* [轮播组件](../week17/component)

### 工具链
* [Dev工具](../week18/NOTE.md)
#### 完整项目代码
* [Toolchain](../week19/toochain)

### 发布系统  


## 写在后面
作为一个非科班且自学的前端，之前一直是零碎地学习，随机碰到的知识点即兴学习，不知道与其他知识的联系，因此也常常遇到某个攻不下的不知道其必要性的知识点半途而废。最后的结果就是，脑子里都是零散的知识，杂乱的堆在一起，漏洞很多，提起来知识都是孤零零的点且无法扩展成面。焦虑地想补课，却不知从何补起。

winter老师从课程一开始就帮我们建立了知识体系，把前端知识点都串起来，然后才开始深入每个节点。这其中很多都是之前从未接触过的知识，在后来的课程里经常会发现这些知识其必要性。


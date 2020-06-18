# 重学浏览器API

## 一道测试题  
把一个元素所有的子元素逆序。
```html
<div id="a">
    <span>1</span>
    <p>2</p>
    <a href="">3</a>
    <div>4</div>
</div>
```
本题很容易想到使用DOM API 中的`appendChild` ，需要注意的考查点是，在`appendChild`前如果先`removeChild`的话，这是多此一举的**丢分行为**，因为所有的DOM元素都只有一个父元素，appendChild操作时会自动把之前的位置先摘除掉。  

* 解法1：
```javascript
function reverseChildren(element){
    // 因为dom.childNodes是live collection，在dom操作时是实时变化的，
    // 如果要获得预期操作结果，需将这个集合转换为常规数组再进行排序操作，
    // 可以使用Array.prototype.slice.call或Array.from
    let children = Array.prototype.slice.call(element.childNodes);
    // 如果使用了DocumentFragment 也是加分的，这样会显著减少dom操作次数
    let fragment = document.createDocumentFragment(); 
    children.reverse();
    for(let child of children)
        fragment.appendChild(children[i]);
        //element.appendChild(children[i]);
    element.appendChild(fragment);
}
```
解法1运用了reverse反转刚刚从childNode拷贝生成的数组，然后依次填回容器。
* 解法2：
```javascript
function reverseChildren(element){
    let l = element.childNodes.length;
    let fragment = document.createDocumentFragment(); 
    while(l--)
        fragment.appendChild(element.childNodes[l]);

    element.appendChild(fragment);
}
```
解法2使用了一种反转算法，精简优雅。  
还有更高级的使用Range API的实现方法。

## Range API （隶属DOM API）
Range代表dom树里的片段，不需要遵循层级关系，甚至可以选择到文本节点里的单个文字位置。  
**优势**： 可以精细操作DOM，可以批量操作DOM。  
Range主要选择API：  
* `var range = new Range()`
* `range.setStart(element, 9)`
* `range.setEnd(element, 4)`
* `var range = document.getSelection().getRangeAt(0);` 鼠标选择  

Range辅助选择快捷API： 

* `range.setStartBefore` 在目标位置的前边设置起点
* `range.setEndBefore`
* `range.setStartAfter`
* `range.setEndAfter`
* `range.selectNode` 选中节点
* `range.selectNodeContents` 选中节点内部的内容  

Range操作API：  

* `let fragment = range.extractContents()`
* `range.insertNode(document.createTextNode(" test text "))`  

有了Range API，上面的面试题便有了新解法。  
解法3：  
```javascript
function reverseChildren(element){
    let range = new Range();
    range.selectNodeContents(element);

    let fragment = range.extractContents();
    let l = fragment.childNodes.length;

    while(l--)
        fragment.appendChild(fragment.childNodes[l]);

    element.appendChild(fragment);
}
```
## CSSOM（不隶属DOM API）
* document.stylesheets

```html
<style title="Hello">
a{
    color:red;
}
</style>
<link rel="stylesheet" title="x" href="data:text/css,p%7Bcolor:blue%7D">
```
上边HTML代码会产生一个用`document.styleSheets`可访问的`StyleSheetList`对象，里面有两个`CSSStyleSheet`对象，`CSSStyleSheet`对象有 **`cssRules`** 、`ownerNode`等属性，其中 **`cssRules`** 是该样式表的所有CSS规则列表，`ownerNode`是样式表来自style还是link。

### Rules  
* `document.styleSheets[0].cssRules` 返回`cssRuleList`对象
* `document.styleSheets[0].insertRule("p {color:pink}", 0)` 不接受对象，接受css规则文本，必须页面要先有style标签才能添加进去。序号是加在第几条。
* `document.styleSheets[0].removeRule(0)`

### Rule  
* CSSStyleRule
    * selectorText String
    * style K-V结构
* CSSCharsetRule
* CSSImportRule
* CSSMediaRule
* CSSFontFaceRule
* CSSPageRule
* CSSNamespaceRule
* CSSKeyframesRule
* CSSKeyframeRule
* CSSSupportsRule

批量修改css属性时，可以用CSSOM操作。

### getComputedStyle
`window.getComputedStyle(elt, pseudoElt)` 反映元素真实样式
* elt 想要获取的元素
* pseudoElt 可选，伪元素

HTML能做的事情DOM都能做，CSS能做的事CSSOM也能做。

DataURI
* content-type + 内容
* data:text/html,\<a>x\</a>


### CSSOM view
* window API
```javascript
let childWindow = window.open('about:blank', "_blank", "width=100,height=100,left=100,top=100")
childWindow.moveBy(50, 50); // moveTo
childWindow.resizeBy(50, 50); // resizeTo
```
* scroll API
    * window
        * window.scrollX(x)
        * window.scrollY(y)
        * window.scrollBy(x, y)
        * window.scrollTo(x, y)
    * element
        * element.scrollBy(x, y)
        * element.scrollTo(x, y)
        * element.scrollTop / element.scrollLeft
        * element.scrollHeight / element.scrollWidth

* `element.getClientRects()` / `element.getBoundingClientRects()`获得块元素位置。  
    这个方法在做拖拽时比较有用，可以获得元素准确位置，否则用top等带着复杂排版逻辑的属性很难获取到真实的位置。

* window.innerHeight / window.innerWidth 视口 *window.outWidth没啥用*  
    document.documentElement.getBoundingClientRect() 也可以获取比较准
* window.devicePixelRatio 
* screen.availHeight / screen.availWidth 硬件

    

## 答疑：
* 富文本编辑器是前端领域难度较高的领域，使用 `contenteditable` 与 `execCommand` 搭配可以制作富文本编辑器。Range API可以实现代替 `execCommand `修改选中文本样式。
* 学知识既不能因学了屠龙之术就束之高阁不用，也不能学了个锤子就到处找钉子，要有一根弦，在遇到问题时能想到这个方案合不合适。
* 移动端iframe不要用，问题太多


# 编程与算法训练 | TicTacToe

算法要求输入输出，编程要求过程、代码结构、语言基础设施的运用。

TicTacToe 规则：
* 棋盘：3x3方格
* 双方分别持有圆圈和叉两种棋子
* 双方交替落子
* 率先练成三子的一方获胜
## 词法、类型

电梯：[week02 class01 笔记](./NOTE1.md)

### Unicode
`A`的码点是65，`a`是97，最初的字符集ASCII，共128个，现存的字符集都兼容ASCII，码点得以保留。  

```javascript
for(let i=0; i<128; i++){
    console.log(String.fromCharCode(i));
}

// var 厉害 = 1;
// console.log(厉害)
// expected output: 1
// 最佳实践：不要用ASCII范围之外的字符做变量名，文件本身编码可能会出问题，实在有需要就要用转义，如\u5389

var \u5389\u5bb3 = 1; //这就是厉害两个字的变量名
```
`unicode`是支持最广的字符集，包含了各国字符。  
`unicode`参考：[比官网更严肃点的字符集网站](https://www.fileformat.info/info/unicode/)

#### [Block](https://www.fileformat.info/info/unicode/block/index.htm)
`CJK`（Chinese Japanese Korean）区域是常用的中文字符区。  

`BMP`（基本字符平面）指四位`U+0000`至`U+FFFF`的内容，兼容性较好，在JavaScript中`String.fromCharCode`和`String.prototype.charCodeAt`只能支持此范围，超出此范围的字符用`String.fromCodePoint`和`String.prototype.codePointAt`。
```javascript
"*".codePointAt(0).toString(16)
// 输出*的unicode的16位进制码点
```

#### [Categories](https://www.fileformat.info/info/unicode/category/index.htm)
[Separator, Space](https://www.fileformat.info/info/unicode/category/Zs/list.htm) 各种合法空格

### Input Element
```
InputElement
    WhiteSpace
    LineTerminator
    Comment
    Token 
        Punctuator
        Keywords
        IdentifierName
            Keywords
            Identifier
            Future reserved Keyword: enum
        Literal
```
#### WhiteSpace
|缩写 | unicode | 转义 |HTML Entity (decimal)|HTML Entity (hex)|HTML Entity (named)| 说明|
| -- | -- | -- | -- | -- | -- | -- |
|`<TAB>`|`U+0009`|`\t`|`&#9;`|`&#x9;`|| **制表符**，除了空格最常用|
|`<VT>`|`U+0011`|`\v`|`&#17;`|`&#x11;`|| 纵向制表符，基本已无排版支持 |
|`<FF>`|`U+000C`|`\f`|`&#12;`|`&#xc;`||form feed|
|`<SP>`|`U+0020`||`&#32;`|`&#x20;`||**space**|
|`<NBSP>`|`U+00A0`||`&#160;`|`&#xa0;`|`&nbsp;`|no-break space，不折行|
|`<ZWNBSP>`|`U+00A0`||`&#65279;`|`&#xfeff;`||[zero width no-break space](https://www.fileformat.info/info/unicode/char/feff/index.htm)，BOM|
|`<USP>`|`U+FEFF`|||||[其他空格](https://www.fileformat.info/info/unicode/category/Zs/list.htm)|

*技巧：在console打印 `\u00A0` 输出的空格，复制到html文档里，可起到`&nbsp;`的作用*  

#### LineTerminator
|缩写 | unicode | 转义 |HTML Entity (decimal)|HTML Entity (hex)|HTML Entity (named)| 说明|
| -- | -- | -- | -- | -- | -- | -- |
|`<LF>`|`U+000A`|`\n`|`&#10;`|`&#xa;`| -- | **Line Feed** 尽量使用`<LF>`不用`<CR>`|
|`<CR>`|`U+000D`|`\r`|`&#13;`|`&#xd;`| -- | Carriage Return 回车 |
|`<LS>`/`<PS>`|-- | -- | -- | -- | -- | 不要用，超出unicode范围|

*虽然 JavaScript 规定支持 `unicode` ，但实际上 `BMP` 范围外支持不好* 

> 关于“回车”（carriage return）和“换行”（line feed）这两个概念的来历和区别。
在计算机还没有出现之前，有一种叫做电传打字机（Teletype Model 33）的玩意，每秒钟可以打10个字符。但是它有一个问题，就是打完一行换行的时候，要用去0.2秒，正好可以打两个字符。要是在这0.2秒里面，又有新的字符传过来，那么这个字符将丢失。
于是，研制人员想了个办法解决这个问题，就是在每行后面加两个表示结束的字符。一个叫做“回车”，告诉打字机把打印头定位在左边界；另一个叫做“换行”，告诉打字机把纸向下移一行。
这就是“换行”和“回车”的来历，从它们的英语名字上也可以看出一二。

#### Comment
`/* */`中的`*`不可以用`/u002a`代替

#### Token
##### IdentifierName
* keywords `for` `let`
* Identifier
*变量名不能跟关键字重合，属性名可以跟关键字重合*
*最佳实践变量名用ascii码范围内字符*
##### Punctuator 
`=` `>` `<`

JavaScript特殊机制：`get` 起到关键字作用，但却可以用做变量名：`var get = 10;`
##### Literal
* 7种原始类型：
    * Number
    * String
    * Boolean
    * Null
    * Undefined
    * Symbol
    * *BigInt*
* 和 Object

原始类型除7种外还有**正则直接量类型**

### Literal
#### Number
IEEE 754 Double Float
* Sign (正负号1位)
* Exponent (科学计数法指数值11位)
* Fraction (科学计数法精度值52位) 

##### Number-Grammar
* DecimalLiteral：
    * `0`
    * `0.`
    * `.2`
    * `1e3` `1E3`
* BinaryIntergerLiteral
    * `0b111`
* OctalIntegerLiteral
    * `0o10`
* HexIntegerLiteral
    * `0xFF`
```javascript
0.toString();
//output: SyntaxError
0 .toString();
//output: "0"
// 因为0.是一个合法的整数，加一个空格就不是了
```

**作业1：** 写一个正则匹配所有Number直接量，文档里有Literals，DecimalLiteral， Number Literal

##### Number——Practice
* Safe Integer
* Float Compare

小数点之间比较是不安全的

```javascript
Number.MAX_SAFE_INTEGER.toString(16)
// output: "1fffffffffffff"
Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON
// output: true
```

#### String
* Character `a`
* Code Point `97`
* Encoding `0110 0001`

##### 常见编码符号集
* **ASCII**
* **Unicode**
* **UCS** *Unicode的子集，是其BMP范围 U+0000 - U+FFFF*
* **GB** *中文字符范围跟unicode不一样，只收录了ASCII和大部分中文，其他国家没有，兼容ASCII*
    * GB2312
    * GBK(GB13000)
    * GB18030
* **ISO-8859** *欧洲国家的标准*
* **BIG5** *台湾那边，繁体中文*

准确的说JavaScript支持UCS

##### String——Encoding
* UTF

|编码|存储ASCII字符|存储中文|
|--| -- | -- |
|UTF8|占1字节/8比特位<br>`'a'` --> `01100001`|占3字节，24比特位<br>`'一'` --> <code>1110**0100** 10**111000** 10**000000**</code><br>1110开头是控制位，粗体是实际编码位|
|UTF16|占2字节/16比特位（0补位）<br>`'a'` --> `00000000 01100001`|占2字节/16比特位<br>`'一'` --> `0100110 00000000`|

**UTF-8 与 Unicode 的关系是，UTF-8 是 Unicode 的实现方式之一**

**最佳实践**：若存储字符以ASCII为主，可存储为UTF8，如果中文拉丁文西文为主等，最好存储为UTF16，甚至UTF32。  
JavaScript是UTF16在内存存储，不承认BMP外的字符，因此`charCode`系列性能高于`codePoint`系列。

**作业2：**
```javascript
function UTF8_Encoding(string){
    //return new Buffer
}
```

##### String——Grammar
* "abc"
* 'abc'
* \`abc\` *template*
    ```javascript
    `I said:"${s1}","${s2}"`

    // 这一行在引擎解析时并非一个直接量，实际拆分为五部分：

    `I said:"${
        s1
    }","${
        s2
    }"`
    ```
**作业3：** 写一个正则表达式匹配除了`template`的string literal（`"` & `'`）

#### Boolean
* true
* false

#### Null
#### Undefined
#### 其他类型-正则直接量
`/a/g`是匹配a的正则表达式，下边写法则变为a/a/g除法：（能插除号的地方是除号，否则是正则表达式）
```javascript
a
/a/g
```

### 答疑
* unicode转GBK：无捷径，硬编码，写对应表。
* 面试技巧：学vue还是react无所谓，要有核心竞争优势，只要有一项打动面试官就成了。
* HTML5没有DTD是为了彻底与SGML割裂，且DTD从来没有被浏览器解析过。HTML4只是设计上和SGML有继承关系，代码没有继承关系，且HTML4也不是SGML引擎解析的。
* 疑问未解：` 1.3 + 1.1 - 2.4 <= Number.EPSILON ` 返回 `false`
* 技术选型：先看有没强需求、内部外部生态，除此可以看情况选
* 建议非ASCII用`\u`转义掉
* 较重要的课：操作系统、计算机网络、算法数据结构
* 大部分的晋升靠做工程体系晋升，只有一块技能会限制发展。做内部系统时，并非代码写出来就好，学会包装对晋升很重要。
* 开源项目：写文档，改bug，写需求，一步一步来。选择参与开源项目的方法：越出名的越好，但并非越出名的项目需要的能力越强，需要大量的人改文档、写例子、看issue、分类，没有一个开源项目是人员充足的。
* JS如果是GBK编码，大部分浏览器会转为unicode


[//]: # (名词查询：微任务、宏任务)
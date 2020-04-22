## 编程语言通识与JavaScript语言设计

电梯：[week02 class02 笔记](./NOTE2.md)

### 1. 语言按语法分类
- 非形式语言
    + 中文，英文
- 形式语言（乔姆斯基谱系<sup id="a1">[[1]](#f1)</sup>）
    + 0型 无限制文法 *（无限制是相对其他3型）*
    + 1型 上下文相关文法
    + 2型 上下文无关文法
        > 大部分计算机语言都是主体上的上下文无关文法
    + 3型 正则文法
        > 能用正则表达式解析的文法，对表达能力的限制比较强

现代主流语言分词法和语法，词法用==正则==处理，把词作为输入流做语法分析（除了极少的语言，如lisp）

### 2. 产生式（BNF<sup id="a2">[[2]](#f2)</sup>）
#### 基本介绍
* 用尖括号括起来的名称来表示语法结构名
* 语法结构分成基础结构和需要用其他语法结构定义的复合结构
    * 基础结构称终结符
    * 复合结构称非终结符
* 引号和中间的字符表示终结符
* 可以有括号
* `*`表示重复多次
* `|`表示或
* `+`表示至少一次 

**示例1：** 
实现只有`a`和`b`的语言：
```diff
# 终结符 "a"
# 终结符 "b"

  <Program>::= "a"+ | "b"+
# 可实现 aaaaa 或 bbb 的形式

  <Program>::= <Program> "a"+ | <Program> "b"+  
# 递归
# 可实现 abababbbbabab 的形式
```
> BNF最重要的技巧：**可递归**

#### 实现四则运算
四则运算：
* `1 + 2 * 3` 

终结符：
* `Number`
* `+ - * /` 

非终结符：
* MultiplicativeExpression
* AddtiveExpression 

**示例2.1：** 
第一步：实现数字、十进制、加法运算、加法、递归连加：

```diff
  <Number> ::= "0" | "1" | "2" | ..... | "9"  
# 数字
  <DecimalNumber> ::= "0" | (("1" | "2" | ..... | "9") <Number>* ) 
# 十进制数

- <AdditiveExpression> ::= <DecimalNumber> "+" <DecimalNumber>
# 加法
- <AdditiveExpression> ::= <AdditiveExpression> "+" <DecimalNumber>
# 连加（递归）

+ <AdditiveExpression> ::= <DecimalNumber> | <AdditiveExpression> "+" <DecimalNumber> 
# 合并了上两步，| 之前的DecimalNumber指单独的一个数也可以是AdditiveExpression的情况
```

**示例2.2：** 
第二步：继续添加乘法、或与逻辑、修改加法表达式：
```diff
  <Number> ::= "0" | "1" | "2" | ..... | "9"
  <DecimalNumber> ::= "0" | (("1" | "2" | ..... | "9") <Number>* )

+ <MultiplicativeExpression> ::= <Decimalnumber> | 
+    <MultiplicativeExpression> "*" <Decimalnumber>
# 添加乘法表达式

- <AdditiveExpression> ::= <AdditiveExpression> "+" <DecimalNumber> 
+ <AdditiveExpression> ::= <MultiplicativeExpression> | 
+     <AdditiveExpression> "+" <MultiplicativeExpression>
# 举例1 + 2 * 3的逻辑，先右2 * 3，加法可以是由先乘法再相加组合起来，
# 同时由于上一步中 | 前边的定义，说明数字1也算是乘法表达式

+ <LogicalExpression> ::= <AdditiveExpression> | 
+     <LogicalExpression> "||" <AdditiveExpression> |
+     <LogicalExpression> "&&" <AdditiveExpression> 
# 添加或与逻辑表达式
```
**示例2.3:** 
第三步：继续添加括号表达式，添加支持减法与除法：
```diff
  <Number> ::= "0" | "1" | "2" | ..... | "9" 
  <DecimalNumber> ::= "0" | (("1" | "2" | ..... | "9") <Number>* )

+ <PrimaryExpression> ::= <DecimalNumber> |
+     "(" <LogicalExpression> ")"
# 添加括号表达式，括号优先级高于乘除，可以是数字，也可以是括号内的逻辑LogicalExpression

- <MultiplicativeExpression> ::= <Decimalnumber> | 
-     <MultiplicativeExpression> "*" <Decimalnumber>
+ <MultiplicativeExpression> ::= <PrimaryExpression> | 
+     <MultiplicativeExpression> "*" <PrimaryExpression> |
+     <MultiplicativeExpression> "/" <PrimaryExpression>
# 1.把 Decimalnumber 替换为 PrimaryExpression ，因为括号 primaryExpression 优先级高于乘除 MultiplicativeExpression
# 2.添加除法表达式

  <AdditiveExpression> ::= <MultiplicativeExpression> | 
      <AdditiveExpression> "+" <MultiplicativeExpression> |
+     <AdditiveExpression> "-" <MultiplicativeExpression>
# 添加减法

  <LogicalExpression> ::= <AdditiveExpression> | 
     <LogicalExpression> "||" <AdditiveExpression> |
     <LogicalExpression> "&&" <AdditiveExpression> 
```

### 3. 通过产生式理解乔姆斯基基谱系
* 0型 无限制文法
    * `?::=?`
        *举例： `<a> <b> ::= "c"` ，很随意*
* 1型 上下文相关文法
    * `?<A>?::=?<B>?`
        *举例： `"a" <b> "c" ::= "a" "x" "c"` ，必须上下文不动*
* 2型 上下文无关文法
    * `<A>::=?`
        *等号左边只能有一个非终结符，示例1,2.1,2.2,2.3都是此类*
* 3型 正则文法
    * `<A>::=<A>?` *正确：因为**正则文法的特点是只允许左递归***
    * ~~`<A>::=?<A>`~~ *错误：非左递归*

**问题1：** JavaScript中的get是哪种文法？ 答案<sup id="a3">[[3]](#f3)</sup> 
```
{
    get a {return 1},
    get : 1
}
```
**问题2：** 下列右结合星星哪种文法？答案<sup id="a4">[[4]](#f4)</sup>  
`2**1**2`

> Exponentiation :  
&emsp;&emsp;UnaryExpression  
&emsp;&emsp;UpdateExpression <strong style="font-weight:bold;">\*\*</strong> Exponentiation  
&nbsp;  
*—— 引自ECMA-262 v10文档*


**可选题目：** 用正则表达式表示四则运算产生式（示例2.3）如：
`<DecimalNumber> = /0|[1-9][0-9]*/`

**学习BNF目的之一：可以读懂语法定义文档标准**

### 4. 其他产生式
自定义产生式

> AdditiveExpression :  
&emsp;&emsp;MultiplicativeExpression  
&emsp;&emsp;AdditiveExpression  <strong style="font-weight:bold;">+</strong>  MultiplicativeExpression  
&emsp;&emsp;AdditiveExpression  <strong style="font-weight:bold;">-</strong>  MultiplicativeExpression  


* *Javascript 属于这种自定义的产生式，* `:` *相当于BNF中的* `::=` *，每一行折行来表示BNF中的* `|` *，用加粗表示终结符，如* <strong style="font-weight:bold;">+</strong> 、 <strong style="font-weight:bold;">-</strong>
* *ECMA文档 Grammar Summary 部分是较关键的部分*
* *通过实例理解会遗漏边边角角，读产生式语法标准则会有较好的完备性*


### 5. 现代语言的特例
* C++ 中，`*`可能表示乘号或指针，具体时间那个，取决于星号前面的标识符是否被声明为类型（非形式语言）
* VB中，`<` 可能是小于号，也可能是XML直接量的开始，取决于当前位置是否可以节后XML直接量（1型文法）
* Python中，行首的`tab`符和空格会根据上一行的行首空白以一定规则被处理成虚拟终结符indent或者dedent（非形式语言）
* Javascript中，`/` 可能是除号，也可能是是正则表达式开头，处理方式类似于VB，字符串模板中也需要特殊处理，还有自动插入分号规则

**练习：** 尽可能寻找你知道的计算机语言，尝试把他们分类

### 6. 图灵完备性
* 图灵完备性<sup id="a5">[[5]](#f5)</sup>（跟图灵机等效的）
    * 命令式——图灵机<sup id="a6">[[6]](#f6)</sup>
        * `goto` （C有这个机制）
        * `if` 和 `while`
    * 声明式——lambda
        * 递归

*HTML/CSS非图灵完备*

### 7. 动态语言与静态语言
* 动态语言：
    * 在用户的设备/在线服务器上
    * 产品实际运行时
    * Runtime
* 静态语言：
    * 在程序员的设备上
    * 产品开发时
    * Compiletime

静态语言适合大规模开发

### 8. 类型系统
* 动态类型系统与静态类型系统
* 强类型与弱类型
    * String + Number
    * String == Boolean
    > 有隐式转换的都是弱类型，例如C++，TypeScript
* 复合类型（静态类型之所以重要，因为有复合类型）
    * 结构体（对象就是结构体）
    ```
    {
        a: T1
        b: T2
    }
    ```
    * 函数签名（参数与返回值构成函数签名）
    ```
    (T1, T2) => T3
    ```
* 子类型 [详解参考](https://jkchao.github.io/typescript-book-chinese/tips/covarianceAndContravariance.html#%E5%8D%8F%E5%8F%98%E4%B8%8E%E9%80%86%E5%8F%98)
    * 协变
    > 凡是能用`Array<Parent>`的地方，都能用`Array<Child>`
    * 逆变
    > 凡是能用`Function<Child>`的地方，都能用`Function<Parent>`

### 9. 一般命令式编程语言
* Atom
    * Identifier（变量名）
    * Literal（直接量）
* Expression
    * Atom
    * Operator
    * Punctuator（符号加减乘除）
* Statement（语句，一般是递归的）
    * Expression
    * Keyword
    * Punctuator
* Structure（结构化）
    * Function
    * Class
    * Process
    * Namespace
    * ……
* Program
    * Program
    * Module
    * Package
    * Library

**《重学JavaScript》体系：**
```mermaid
graph LR
A(语法) -->|语义|B(运行时)
```

### 答疑
[JavaScript内存管理](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Memory_Management)  
[Cookies](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Cookies )
推荐红宝书  
TS,LESS属于工程应用  
可拖拽属于IDE领域知识，若复杂起来，对架构有要求  
防CSRF攻击方法，防止表单提交，用XMLHttp  

----
1. <b id="f1"></b>乔姆斯基是麻省理工学院语言学的荣誉退休教授，他的生成语法被认为是对20世纪理论语言学研究的重要贡献。[↩](#a1)
2. <b id="f2"></b>[巴科斯-诺尔范式](https://zh.wikipedia.org/wiki/%E5%B7%B4%E7%A7%91%E6%96%AF%E8%8C%83%E5%BC%8F) （BNF）是一种用于表示上下文无关文法的语言规定是推导规则(产生式)的集合，写为：`<符号> ::= <使用符号的表达式>`。这里的`<符号>`是非终结符，而表达式由一个符号序列，或用指示选择的竖杠 `|` 分隔的多个符号序列构成，每个符号序列整体都是左端的符号的一种可能的替代。从未在左端出现的符号叫做终结符。[↩](#a2)
3. <b id="f3"></b>JavaScript中的`get`是1型（上下文相关文法），因为`get a`与`get :`产生了不同的意思，JavaScript中为数不多的非2型部分[↩](#a3)
4. <b id="f4"></b>右结合星星是2型（上下文无关文法），如果JavaScript没有星星，那么JavaScript基本可以符合3型正则文法[↩](#a4)
5. <b id="f5"></b>图灵完备性：在可计算性理论里，如果一系列操作数据的规则（如指令集、编程语言、细胞自动机）可以用来模拟单带图灵机，那么它是图灵完全的。这个词源于引入图灵机概念的数学家艾伦·图灵。虽然图灵机会受到储存能力的物理限制，图灵完全性通常指“具有无限存储能力的通用物理机器或编程语言”。[↩](#a5)
6. <b id="f6"></b> 图灵机：又称确定型图灵机，是英国数学家艾伦·图灵于1936年提出的一种将人的计算行为抽象掉的数学逻辑机，其更抽象的意义为一种计算模型，可以看作等价于任何有限逻辑数学过程的终极强大逻辑机器。[↩](#a6)

[//]: # (名词查询：中序遍历、AST树、CSRF)
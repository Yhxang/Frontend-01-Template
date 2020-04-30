## JavaScript | 语句 Statement，对象
---
### Grammar
* 简单语句
* 组合语句
* 声明
### Runtime
* Completion Record *（完成的记录）*
    * [\[type]]: normal, break, continue, return, or throw
    * [\[value]]: Types
    * [\[target]]: label *为了break，continue存在*
* Lexical Environment
---
### Grammar
#### 简单语句
* ExpressionStatement *([\[type]]:normal)*
    `a = 1 + 2;`
* EmptyStatement *([\[type]]:normal)*
    `;`
* DebuggerStatement *([\[type]]:normal)*
    `debugger`
* ThrowStatment
    `throw a`
* ContinueStatement
    `continue label1`
* BreakStatement
    `break label2`
* ReturnStatement
    `return 1 + 2`
#### 组合语句
* BlockStatement
    * [\[type]]: normal
    * [\[value]]: --
    * [\[target]]: --

    结构是block花括号括起来的部分，对象花括号不允许出现在语句的开头，如果出现在语句头部一定是block。例如：
    ```javascript
    {
        a : 1
    }
    ```
    这个语句会被理解为block而不是对象，a 则是 label。  
    ES6中可用作let、const作用域。  
    如果block中出现非normal类型，会中断，如出现throw等。

* IfStatement
* SwitchStatement
* IterationStatement
* WithStatement
* LabelledStatement
* TryStatement
    try语句不能省略花括号，唯一一种从函数内部蔓延到外部的Completion Record类型。
    ```javaScript
    try{
        throw 2;
    }catch(e){
        // 与for的括号不同，这儿没有父子作用域，只有一个作用域。
        console.log(e)
    }finally{

    }
    ```
    术语**作用域**指的是代码作用文本的范围，不关心运行时。**上下文**指用户已执行的电脑上内存存变量的地方。

**Iteration**
* **while(** *Expression* **){** *block* **}**
* **do{** *block* **}while(** *Expression*  **)**
* **for(** *VariableDeclarationList* **;** *Expression* **;** *Expression* **){ }**
    for循环圆括号中的let和大括号中的let是两个父子作用域，var则不受声明位置限制。
* **for(** *VariableDeclarationList* **in** *Expression* **){ }**
    ```javascript
    for(let p in {a:1, b:2}){
        console.log(p)
    }
    ```
* **for(** *VariableDeclarationList* **of** *Expression* **){ }** *访问有迭代的结构 Generator/Array*
    ```javascript
    for(let q of [1,2,3]){
        console.log(q);
    }

    function *g(){
        yield 0;
        yield 1;
        yield 4;
    }
    for(let p of g()){
        console.log(p)
    }
    ```
    for of实质是访问Iterator，然后访问Generator/Array
* ~~for await( of )~~

#### 声明
* FunctionDeclaration
    ```javascript
    function foo(){ }
    //函数声明
    var o = function foo(){ }
    //函数表达式可省略名字，但不能出现在语句开头

    //class同理
    class cls{ }
    var cls1 = class{ } 
    ``` 
* GeneratorDeclaration
    ```javascript
    function* foo(){
        yield 1; 
        yield 2;
        var i = 3;
        while(true)
            yield i++;
    }
    var gen = foo();
    gen.next();
    gen.next();
    //...
    //var o = function* foo(){ } //表达式
    ```
    generator跟异步async没有关系，只是刚好可以模拟await。
    术语结构化编程的一部分，可以为编程方式多一个选项
* AsyncFunctionDeclaration
    ```javascript
    
    ```
* AsyncGeneratorDeclaration
* VariableStatement
* ClassDeclaration
* LexicalDeclaration


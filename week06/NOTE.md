# 有限状态机处理字符串

有限状态机（FSM）是一种编程的思想，应用非常广，游戏敌人AI、编译原理构建AST、正则表达式的实现。

有限状态机重点在于机，不在于状态。

* 每一个状态都是一个互相独立的机器
    * 与我们平时用变量表示状态不同，状态机把每个状态都设计成独立的机器，在每一个机器里我们都可以做计算、存储、输出……
    * 所有的这些机器接受的输入是一致的，例如要么都接受string，要么都能接受number，要么都能接受两种
    * 状态机的每一个机器本身没有状态，如果我们用函数表示的话，它应该是纯函数（无副作用，不能依赖外部环境不停地发生变化）
* 每一个机器知道下一个状态
    * 每个机器都有确定的下一个状态（Moore）
    * 每个机器根据输入决定下一个状态（Mealy）


#### 1.在一个字符串中，找到字符“a”：
```javascript
function match(string) {
    for(let c of string){
        if(c == "a")
            return true
        return false
    }
}
match("I am groot");
``` 
#### 2.在字符串中找到“ab”：
```javascript
function match(string) {
    let foundA = false;
    for(let c of string) {
        if(c == "a")
            foundA = true;
        else if(foundA && c == "b")
            return true
        else
            foundA = false;
    }
    return false;
}
console.log(match("I abm groot"))
```
#### 3.在字符串中找到“abcdef”
```javascript
function match(string){
    let foundA = false;
    let foundB = false;
    let foundC = false;
    let foundD = false;
    let foundE = false;
    for(let c of string){
        if(c == "a"){
            foundA = true;
        }else if(foundA && c == "b"){
            return foundB = true;
        }else if(foundB && c == "c"){
            return foundC = true;
        }else if(foundC && c == "d"){
            return foundD = true;
        }else if(foundD && c == "e"){
            return foundE = true;
        }else if(foundE && c == "f"){
            return true;
        }else{
            foundA = false;
            foundB = false;
            foundC = false;
            foundD = false;
            foundE = false;
        }
    }
    return false;
}
```
这样的代码已写死，不可扩展，且有多次判断，判断found的过程，实际上分成了独立的函数，这时是很适合状态机来改造的场景。

### JS状态机的写法
```javascript
//每个函数是一个状态
function state(input){//函数参数就是输入
    //在函数日，可以自由编写代码，处理每个状态的逻辑
    return next; //返回值作为下一个状态
}

////以下是调用////
while(input){
    //获取输入
    state = state(input); //把状态机的返回值作为下一个状态
}
```
#### 4.用状态机改造[代码片段3](#3.在字符串中找到“abcdef”)的内容：
```javascript
function match(string){
    let state = start;
    for(let c of string){
        state = state(c);
    }
    return state === end; //根据最后state所处的状态判断是否正确匹配到了
}
function start(c){
    if(c == "a")
        return foundA;
    else
        return start;
}
function end(c){ //小技巧，陷阱状态
    return end;
}
function foundA(c){
    if(c === "b")
        return foundB;
    else
        return start;
}
function foundB(c){
    if(c === "c")
        return foundC;
    else
        return start;
}
function foundC(c){
    if(c === "d")
        return foundD;
    else
        return start;
}
function foundD(c){
    if(c === "e")
        return foundE;
    else
        return start;
}
function foundE(c){
    if(c === "f")
        return end;
    else
        return start;
}
console.log(match("I abm gabcdefroot")); //true
console.log(match("aabcdef")); //false
```
#### 5.修复处理“aabcdef”错误
这段代码有个问题是处理“aabcdef”时会有错误，因为检测第一个“a”后返回`foundA`，`foundA`里是寻找“b”的逻辑，这样就会返回`start`，最后得出`state`不是`end`而是`start`的错误状态，因此需要改造下，让`foundA`检测到不是“b”时，代理到重新检测“a”，具体改造方式为把`return start`改为`return start(c)`，代码如下：
```javascript
function match(string){
    let state = start;
    for(let c of string){
        state = state(c);
    }
    return state === end; 
}
function start(c){
    if(c == "a")
        return foundA;
    else
        return start;
}
function end(c){ 
    return end;
}
function foundA(c){
    if(c === "b")
        return foundB;
    else
        return start(c); //本状态代理到start
}
function foundB(c){
    if(c === "c")
        return foundC;
    else
        return start(c);
}
function foundC(c){
    if(c === "d")
        return foundD;
    else
        return start(c);
}
function foundD(c){
    if(c === "e")
        return foundE;
    else
        return start(c);
}
function foundE(c){
    if(c === "f")
        return end;
    else
        return start(c);
}
console.log(match("I abm gabcdefroot")); //true
console.log(match("aabcdef")); //false
```
#### 6.用状态机处理“abcabx”字符串
先用上边的逻辑写一段代码：
```javascript
function match(string){
    let state = start;
    for(let c of string){
        state = state(c);
    }
    return state === end; 
}
function start(c){
    if(c == "a")
        return foundA;
    else
        return start;
}
function end(c){ 
    return end;
}
function foundA(c){
    if(c === "b")
        return foundB;
    else
        return start(c); //本状态代理到start
}
function foundB(c){
    if(c === "c")
        return foundC;
    else
        return start(c);
}
function foundC(c){
    if(c === "a")
        return foundA2;
    else
        return start(c);
}
function foundA2(c){
    if(c === "b")
        return foundB2;
    else
        return start(c);
}
function foundB2(c){
    if(c === "x")
        return end;
    else
        return start(c);
}
console.log(match("abcabx")); //true
console.log(match("abcabcabx")); //false 而正确结果应该也为true
```
结果说明，这段代码在匹配“abcabx”时得到正确的结果，但在匹配“abcabcabx”得出了错误的结果（结果应该也为true）。  

究其原因，“abcabx”这个pattern的特殊之处在于，检测类似“abcabcabx”的字符串时，在检测到第二个“ab”后面的字母不是“x”而是“c”后，`foundB2(c)`返回了`start("c")`，进而`start("c")`返回`start`函数本身重头检测，然而这时只剩下“abx”三个字母去匹配“abcabx”，自然就错过了检测abcabx的时机，导致返回错误的结果。

修改思路：检测到“abcabcabx”字符串中的第二个“c”时，即使这个字母不是上段代码中要检测的“x”，它其实还有可能是pattern中的第一个“c”，因此需要在`c != "x"`时的状态当做刚找到第一个“ab”时的状态，也就是将`foundB2(c)`中的`return start(c)`改成`return foundB(c)`。
```javascript
function match(string){
    let state = start;
    for(let c of string){
        state = state(c);
    }
    return state === end; 
}
function start(c){
    if(c == "a")
        return foundA;
    else
        return start;
}
function end(c){ 
    return end;
}
function foundA(c){
    if(c === "b")
        return foundB;
    else
        return start(c); //本状态代理到start
}
function foundB(c){
    if(c === "c")
        return foundC;
    else
        return start(c);
}
function foundC(c){
    if(c === "a")
        return foundA2;
    else
        return start(c);
}
function foundA2(c){
    if(c === "b")
        return foundB2;
    else
        return start(c);
}
function foundB2(c){
    if(c === "x")
        return end;
    else
        return foundB(c); //如果这个时候不是“x”的话，当成第一个“c”的位置来检测
}
console.log(match("abcabx")); //true
console.log(match("abcabcabx")); //true 这次为正确结果
```
作业：使用状态机完成“abababx”的处理。

可选作业：我们如何用状态机处理完全未知的pattern  
提示1：闭包
提示2：参考资料-[字符串KMP算法](https://en.wikipedia.org/wiki/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm)
```javascript
function match(pattern,string){
    //???
}
match("ababx", "I am ababx! hahah!")
```

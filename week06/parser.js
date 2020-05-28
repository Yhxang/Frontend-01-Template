const css = require('css');

const EOF = Symbol("EOF"); // End Of File

let currentToken = null;

let currentAttribute = null;

// 从标签构建DOM树的基本技巧是使用栈。
// 遇到开始标签时创建元素并入栈，遇到结束标签时出栈。
// 核心思想：新入栈的element一定是栈顶元素的子元素，换句话说，任何元素的父元素时它入栈前的栈顶。

let stack = [{type: "document", children: []}];
// 声明stack栈，stack[0]是最后得到的dom树
let currentTextNode = null;

// 加入一个新的函数，addCSSRules，把CSS规则暂存到一个数组里
let rules = [];
function addCSSRules(text){
    var ast = css.parse(text);
    //console.log(JSON.stringify(ast, null, "  "));
    rules.push(...ast.stylesheet.rules);
}

function match(element, selector){
    if(!selector || !element.attributes)
        return false;
    // TODO：实现复合选择器
    if(selector.charAt(0) == "#"){
        var attr = element.attributes.filter(attr => attr.name === "id")[0];
        if(attr && attr.value === selector.replace("#", ''))
            return true;
    }else if(selector.charAt(0) == "."){
        var attr = element.attributes.filter(attr => attr.name === "class")[0];
        if(attr && attr.value === selector.replace(".", ''))
            return true;
        // TODO: <div class="cls1 cls2"> 匹配多个class的情况（遍历for）
    }else{
        if(element.tagName === selector){
            return true;
        }
    }
    return false;
}

function specificity(selector){
    var p = [0, 0, 0, 0];
    var selectorParts = selector.split(" ");
    for(var part of selectorParts){
        // 未支持复合选择器(div a#id.cls)
        // TODO: 支持复合选择器（用正则再拆一次）
        if(part.charAt(0) == "#"){
            p[1] += 1;
        }else if(part.charAt(0) == "."){
            p[2] += 1;
        }else{
            p[3] += 1;
        }
    }
    return p;
}

function compare(sp1, sp2){
    // 高位能比出来大小的话，低位就不算了直接return掉
    if(sp1[0] - sp2[0])
        return sp1[0] - sp[0];
    if(sp1[1] - sp2[1])
        return sp1[1] - sp2[1];
    if(sp1[2] - sp2[2])
        return sp1[2] - sp2[2];

    return sp1[3] - sp2[3];
}

function computeCSS(element){
    var elements = stack.slice().reverse(); 
    // 命中当前元素的CSS，与其CSS规则最后一个项一定匹配（例如div div #myid中的#myid为最后一个项）
    // 因为HTML parser和CSS parser写在了一起，所以这里是偷懒的写法，直接拿到stack
    // 更合适的方法是通过parent实现
    // 每个瞬间elements都包含了当前element的父元素
    // TODO：parent实现div>#myid
    if(!element.computedStyle)
        element.computedStyle = {};
    
    for(let rule of rules){
        var selectorParts = rule.selectors[0].split(" ").reverse();

        if(!match(element, selectorParts[0])) // 匹配当前元素
            continue;
        
        // 下边这个循环是匹配css父元素规则的算法
        // elements数组是当前元素的父元素列表的队列，用父元素逐层匹配复杂选择器拆分后的单个选择器的列表，匹配到的话j加1，
        // 如果最后把选择器拆分列表走完了（也就是j>=selectorParts.length），那就说明这条css rule匹配成功。
        let matched = false;
        var j = 1;
        for(var i = 0; i < elements.length; i++){
            if(match(elements[i], selectorParts[j])){
                j++;   
            }
        }

        if(j >= selectorParts.length)
            matched = true;

        if(matched){
            var sp = specificity(rule.selectors[0]);

            var computedStyle = element.computedStyle;
            for(var declaration of rule.declarations){
                if(!computedStyle[declaration.property])
                    computedStyle[declaration.property] = {};

                //computedStyle[declaration.property] = declaration.value; // 因为要处理优先级使用下边这句
                //computedStyle[declaration.property].value = declaration.value;
                if(!computedStyle[declaration.property].specificity){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }else if(compare(computedStyle[declaration.property].specificity, sp) < 0){
                    computedStyle[declaration.property].value = declaration.value;
                    computedStyle[declaration.property].specificity = sp;
                }
            }
            // console.log("Element", element, "matched rule", rule);
        }

    }
}

function emit(token){
    let top = stack[stack.length-1]; // 获取栈顶

    if(token.type == "startTag"){
        let element = {
            type: "element",
            children: [],
            attributes: []
        };

        element.tagName = token.tagName;
        
        for(let p in token){
            if(p != "type" && p != "tagName"){
                element.attributes.push({
                    name : p,
                    value: token[p]
                });
            }
        }

        computeCSS(element); //只要有元素创建了，就可以计算css，应尽早的在元素创建时添加css规则

        top.children.push(element); // 把新element推入栈顶element的children数组
        //element.parent = top; 

        if(!token.isSelfClosing)
            stack.push(element); 
        // 如果不是自封闭标签，推入栈。如果是自封闭标签，理论上应该入栈之后立刻出栈，所以实际上不用推入栈

        currentTextNode = null;
    }else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match"); 
            // 开始标签和结束标签不匹配，抛错。
            // 实际上，正式浏览器在这里会做开始结束标签不匹配的容错措施。
        }else{
            // 遇到style标签时，执行添加CSS规则的操作
            if(top.tagName === "style"){
                addCSSRules(top.children[0].content);
            }
            stack.pop(); // 结束标签出栈
        }
        currentTextNode = null;
    }else if(token.type == "text"){
        // 文本节点
        if(currentTextNode == null){
            currentTextNode = {
                type: "text",
                content: ""
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
}

function data(c){ // HTML文档中规定，初始为Data State
    if(c == "<"){
        return tagOpen;
    }else if(c == EOF){
        emit({
            type: "EOF"
        })
        return ;
    }else{
        emit({
            type: "text",
            content: c
        })
        return data;
    }
}

function tagOpen(c){
    if(c == "/"){ //自封闭标签
        return endTagOpen;
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: "startTag",
            tagName: ""
        }
        return tagName(c); // 如果是字母，则把字符代理到标签名状态Tag name state
    }else if(c == EOF){
        // error
    }else{
        return ;        
        // 这时应该是缺少“>”的错误状态，文档规定的容错方式是把之前的“<”当成文本节点，emit一个“>”字符，然后进入Data state。
        // 涉及修改上个TagOpen状态为Text状态，比较复杂，在Toy-Browser里暂时不处理。
        // 下边是老师的代码，与文档的规定不符。
        // emit({
        //     type: "text",
        //     content: c
        // })
        // return ;
    }
}

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName; //如果是空格制表符换行符，则进入等待读取属性名的状态
    }else if(c == "/"){
        return selfClosingStartTag; //如果是/，则转换为自封闭标签
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c; //c.toLowerCase();
        return tagName; //如果是字母，则仍为标签名状态
    }else if(c == ">"){
        emit(currentToken); // emit Token
        return data; // 如果是>，结束标签，进入初始Data state
    }else{
        currentToken.tagName += c;
        return tagName;
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/" || c == ">" || c == EOF){
        return afterAttributeName(c); //tagname空格后如果出现/ >则进入属性名之后的状态
    }else if(c == "="){ 
        //error，tagname空格后如果出现=，应该报错
    }else{
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c); // 把字符代理到读取属性名状态
    }
}

function attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){
        return afterAttributeName(c); // 把字符代理到属性名之后状态
    }else if(c == "="){
        return beforeAttributeValue; // 等待属性值状态
    }else if(c == "\u0000"){
        // null
    }else if(c == "\"" || c == "'" || c == "<"){
        // error 文档有容错
    }else{
        currentAttribute.name += c; //追加字母到当前属性的名字字符串里
        return attributeName;
    }
}

function afterAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return afterAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == "="){
        return beforeAttributeValue;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){
        // error
    }else{
        // 在当前Tag Token开启一个新的属性，并设name和value为""
        currentToken[currentAttribute.name] = currentAttribute.value;
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}



function beforeAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){
        return beforeAttributeValue; //继续等待属性值
    }else if(c == "\""){
        return doubleQuoteAttributeValue; // 双引号属性
    }else if(c == "'"){
        return singleQuoteAttributeValue; // 单引号属性
    }else if(c == ">"){
        //error
        //emit(currentToken);
        //return data;
    }else{
        return UnquotedAttributeValue(c); // 无引号属性，把字符代理给无引号属性状态处理
    }
}

function UnquotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    }else if(c == "/"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == "\u0000"){

    }else if(c == "\"" || c == "'" || c == "<" || c == "=" || c == "`"){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}
function doubleQuoteAttributeValue(c){
    if(c == "\""){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue; // 属性引号结束状态
    }else if(c == "\u0000"){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return doubleQuoteAttributeValue;
    }
}
function singleQuoteAttributeValue(c){
    if(c == "'"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    }else if(c == "\u0000"){

    }else if(c == EOF){

    }else{
        currentAttribute.value += c;
        return doubleQuoteAttributeValue;
    }
}

function afterQuotedAttributeValue(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/"){
        return selfClosingStartTag;
    }else if(c == ">"){
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    }else if(c == EOF){

    }else{
        return beforeAttributeName(c); // 缺少属性间的空格的错误，转到准备读下个属性的状态
        
        //下边这两句是老师写的（视频50'48"），应该是错误的，因为与文档规定的不符
        //currentAttribute.value += c;
        //return doubleQuoteAttributeValue; 
    }
}

function endTagOpen(c){
    if(c.match(/^[a-zA-Z]$/)){
        currentToken = {
            type: "endTag",
            tagName: ""
        }
        return tagName(c);
    }else if(c == ">"){

    }else if(c == EOF){

    }else{

    }
}

function selfClosingStartTag(c){
    if(c == ">"){
        currentToken.isSelfClosing = true;
        emit(currentToken)
        return data;
    }else if(c == EOF){

    }else{

    }
}
module.exports.parseHTML = function parseHTML(html){
    let state = data;
    for(let c of html){
        state = state(c)
    }
    state = state(EOF);

    return stack[0];
    //console.log(stack[0])
    //console.log(JSON.stringify(stack[0],null,"  "))
}

// { type: 'startTag', tagName: 'html', maaa: 'a' }
// { type: 'startTag', tagName: 'head' }
// { type: 'startTag', tagName: 'style' }
// { type: 'endTag', tagName: 'style' }
// { type: 'endTag', tagName: 'head' }
// { type: 'startTag', tagName: 'body' }
// { type: 'startTag', tagName: 'div' }
// { type: 'startTag', tagName: 'img', id: 'myid', isSelfClosing: true }
// { type: 'startTag', tagName: 'img', isSelfClosing: true }
// { type: 'endTag', tagName: 'div' }
// { type: 'endTag', tagName: 'body' }
// { type: 'endTag', tagName: 'html' }
// { type: 'EOF' }

// {
//     "type": "document",
//     "children": [
//       {
//         "type": "element",
//         "children": [
//           {
//             "type": "element",
//             "children": [
//               {
//                 "type": "element",
//                 "children": [],
//                 "attributes": [],
//                 "tagName": "style"
//               }
//             ],
//             "attributes": [],
//             "tagName": "head"
//           },
//           {
//             "type": "element",
//             "children": [
//               {
//                 "type": "element",
//                 "children": [
//                   {
//                     "type": "element",
//                     "children": [],
//                     "attributes": [
//                       {
//                         "name": "id",
//                         "value": "myid"
//                       },
//                       {
//                         "name": "isSelfClosing",
//                         "value": true
//                       }
//                     ],
//                     "tagName": "img"
//                   },
//                   {
//                     "type": "element",
//                     "children": [],
//                     "attributes": [
//                       {
//                         "name": "isSelfClosing",
//                         "value": true
//                       }
//                     ],
//                     "tagName": "img"
//                   }
//                 ],
//                 "attributes": [],
//                 "tagName": "div"
//               }
//             ],
//             "attributes": [],
//             "tagName": "body"
//           }
//         ],
//         "attributes": [
//           {
//             "name": "maaa",
//             "value": "a"
//           }
//         ],
//         "tagName": "html"
//       }
//     ]
//   }

/* //版本1：先搭一个简单的输出模块

module.exports.parseHTML = function parseHTML(html){
    console.log(html);
}
*/
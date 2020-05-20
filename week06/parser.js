let currentToken = null;
let currentAttribute = null;

let stack = [{type: "document", children: []}];

function emit(token){
    // if(token.type != "text")
    //     console.log(token);
    if(token.type == "text")
        return;

    let top = stack[stack.length-1]; //新入栈的element一定是栈顶的子元素
    //console.log(token)
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

        top.children.push(element);
        element.parent = top;

        if(!token.isSelfClosing)
            stack.push(element); // 如果不是自封闭标签，推入栈顶

        currentTextNode = null;
    }else if(token.type == "endTag"){
        if(top.tagName != token.tagName){
            throw new Error("Tag start end doesn't match")
        }else{
            stack.pop();
        }
    }
    // if(token.tagName=='html'){
    //     console.log(JSON.stringify(stack[0]))
    // }
    
}

const EOF = Symbol("EOF"); // End Of File

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
            context: c
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
        return tagName(c); // 如果是字母，则进入标签名状态Tag name state
    }else{
        return ;
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

function tagName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName; //如果是空格制表符换行符，则进入等待读取属性名的状态
    }else if(c == "/"){
        return selfClosingStartTag; //如果是/，则转换为自封闭标签
    }else if(c.match(/^[a-zA-Z]$/)){
        currentToken.tagName += c; //c.toLowerCase();
        return tagName; //如果是字母，则仍为标签名状态
    }else if(c == ">"){
        emit(currentToken);
        return data; // 如果是>，结束标签，进入初始Data state
    }else{
        return tagName;
    }
}

function beforeAttributeName(c){
    if(c.match(/^[\t\n\f ]$/)){
        return beforeAttributeName;
    }else if(c == "/" || c == ">" || c == EOF){
        return afterAttributeName(c); //tagname空格后如果出现/ >则进入属性名之后的状态
    }else if(c == "="){ 
        //tagname空格后如果出现=，应该报错
    }else{
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c); //读取属性名
    }
}

function attributeName(c){
    if(c.match(/^[\t\n\f ]$/) || c == "/" || c == ">" || c == EOF){
        return afterAttributeName(c);
    }else if(c == "="){
        return beforeAttributeValue; // 等待属性值状态
    }else if(c == "\u0000"){
        // null
    }else if(c == "\"" || c == "'" || c == "<"){

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
        //return data;
    }else{
        return UnquotedAttributeValue(c); // 无引号属性，直接把字符喂给无引号属性状态处理
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

/* //版本1：先搭一个简单的输出模块

module.exports.parseHTML = function parseHTML(html){
    console.log(html);
}
*/
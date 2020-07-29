var parser = require("./parser.js");

module.exports = function (source, map) {
    let tree = parser.parseHTML(source); // 解析为DOM树
    console.log(tree.children[1].children[0].content); // 获取script标签内的JS文本
    
    let template = null;

    for(let node of tree.children){
        if(node.tagName === "template"){
            template = node.children.filter(node => node.type !== "text")[0];
        }
        if(node.tagName === "script"){
            script = node.children[0].content;
        }
        // if(node.tagName === "style"){
    }
    console.log(template)
    let createCode = "";
    let visit = (node) => {
        if(node.type === "text") // 文本节点没有attribute，单独做处理
            return JSON.stringify(node.content);
        
        let attrs = {}
        for(let attribute of node.attributes) {
            attrs[attribute.name] = attribute.value;
        }
        let children = node.children.map(node => visit(node)); // 递归返回createElement嵌套字符串

        return `createElement("${node.tagName}", ${JSON.stringify(attrs)}, ${children})`
    }

    return  `
import {createElement, Text, Wrapper} from "./createElement";
export class Carousel{ //TODO: extends Base Class
    setAttribute(name, value){ // attribute
        this[name] = value;
    }
    render(){
        return ${visit(template)};
    }
    mountTo(parent){
        this.render().mountTo(parent);
    }
}
        `;
}

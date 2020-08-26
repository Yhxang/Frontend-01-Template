import {enableGesture} from "./gesture"

export function createElement(Cls, attributes, ...children) {
    // console.log(arguments)
    // debugger
    let o;
    if (typeof Cls == "string") {
        o = new Wrapper(Cls);
    }
    else {
        o = new Cls({
            timer: {}
        });
    }


    for (let name in attributes) {
        //o[name] = attributes[name]; // 用property
        o.setAttribute(name, attributes[name]); //用attribute
    }
    //console.log(children)
    let visit = (children) => {
        for (let child of children) {
            //o.children.push(child);
            if (typeof child == "string")
                child = new Text(child);

            if (Array.isArray(child)) {
                visit(child); // 递归
                continue;
            }

            if(typeof child === "function"){
                console.log("child is Function type: ", child)
            }
            o.appendChild(child);
        }
    };

    visit(children);

    return o;
}

export class Wrapper{
    constructor(type){
        //console.log("config", config);
        this.children = [];
        this.root = document.createElement(type);
    }

    set class(v){ // property
        console.log("Wrapper::class", v); //在 o[name] = attributes[name] 时触发
    }

    set id(v){
        console.log("Wrapper::id", v);
    }

    get classList(){
        return this.root.classList;
    }

    get style(){
        return this.root.style;
    }

    set innerText(text){
        return this.root.innerText = text;
    }

    setAttribute(name, value){ // attribute
        //console.log("Parent::setAttribute", name, value)
        this.root.setAttribute(name, value);
        if(name === "enableGesture"){
            enableGesture(this.root);
        }
        if(name.match(/^on([\s\S]+)$/)){ // onStart -> 'start' 绑定指定事件函数
            let eventName = RegExp.$1.replace(/^\S/, s => s.toLowerCase());
            this.root.addEventListener(eventName, value);
        }

    }
    getAttribute(name){
        return this.root.getAttribute(name);
    }

    mountTo(parent){
        parent.appendChild(this.root);

        for(let child of this.children){
            if(typeof child === "string")
                child = new Text(child)
            child.mountTo(this.root);
        }
    }

    appendChild(child){ // children
        console.log("Wrapper::appendChild", child)
        //this.root.appendChild(child);
        //child.mountTo(this.root);
        this.children.push(child);
    }

    addEventListener(){
        this.root.addEventListener(...arguments);
    }
}
export class Text{
    constructor(text){
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}
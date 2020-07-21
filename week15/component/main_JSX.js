//require("./foo.js")
//import "./foo"

function createElement(Cls, attributes, ...children){
    // console.log(arguments)
    // debugger
    let o
    if(typeof Cls == "string"){
        o = new Wrapper(Cls)
    }else{
        o = new Cls({
            timer: {}
        });
    }

    
    for(let name in attributes){
        //o[name] = attributes[name]; // 用property
        o.setAttribute(name, attributes[name]); //用attribute
    }
    //console.log(children)

    for(let child of children){
        //o.children.push(child);
        o.appendChild(child);
    }
    return o;
}

class Wrapper{
    constructor(type){
        //console.log("config", config);
        this.children = [];
        this.root = document.createElement(type);
    }

    set class(v){ // property
        console.log("Parent::class", v); //在 o[name] = attributes[name] 时触发
    }

    set id(v){
        console.log("Parent::id", v);
    }

    setAttribute(name, value){ // attribute
        //console.log("Parent::setAttribute", name, value)
        this.root.setAttribute(name, value);
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
        console.log("Parent::appendChild", child)
        //this.root.appendChild(child);
        //child.mountTo(this.root);
        this.children.push(child);
    }
}
class Text{
    constructor(text){
        this.root = document.createTextNode(text);
    }
    mountTo(parent){
        parent.appendChild(this.root);
    }
}

class MyComponent{
    constructor(config){
        //console.log("config", config);
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    set class(v){ // property
        console.log("Parent::class", v); //在 o[name] = attributes[name] 时触发
    }

    set id(v){
        console.log("Parent::id", v);
    }

    setAttribute(name, value){ // attribute
        this.attributes.set(name, value);
    }

    set title(value){
        this.properties.set("title", value);
    }

    render(){
        //this.slot = <div></div>
        return <article>
            <h1>{this.attributes.get("title")}</h1>
            <h2>{this.properties.get("title")}</h2>
            <header>I'm a header</header>
            {this.slot}
            <footer>I'm a footer</footer>
        </article>
    }

    appendChild(child){ // children
        console.log("Parent::appendChild", child)
        //this.slot.appendChild(child);
        this.children.push(child)
    }
    mountTo(parent){
        this.slot = <div></div>
        for(let child of this.children){
            if(typeof child === "string"){
                child = new Text(child)
            }
                
            this.slot.appendChild(child)
        }
        this.render().mountTo(parent);
    }
}

// let component = <div id="a" class="b" style="width:100px; height:100px; background-color:green;">
//     <div></div>
//     <p>123</p>
//     <div></div>
//     <div></div>
//     </div>

// let component = <div>{new Wrapper('span')}</div>

// let component = <MyComponent>
//         <div>{new Wrapper('span')}</div>
//     </MyComponent>
let component = <MyComponent title="I'm a title">
        <div>text text text</div>
    </MyComponent>
component.title = "I'm a property title";
component.mountTo(document.body)
console.log(component)
//component.id = "b"
//component.setAttribute("id", "b");
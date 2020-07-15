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
    let visit = (children) => {
        for(let child of children){
            //o.children.push(child);
            if(typeof child == "string")
                child = new Text(child);

            if(Array.isArray(child)){
                visit(child);
                continue;
            }
            o.appendChild(child);
        }
    }

    visit(children);

    return o;
}

class Wrapper{
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
        console.log("Wrapper::appendChild", child)
        //this.root.appendChild(child);
        //child.mountTo(this.root);
        this.children.push(child);
    }

    addEventListener(){
        this.root.addEventListener(...arguments);
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

/*
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
*/
class Carousel{
    constructor(config){
        //console.log("config", config);
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
    }

    setAttribute(name, value){ // attribute
        this[name] = value;
    }

    render(){
        return <div class="carousel">
            { this.data.map(url => {
                let element = <img src={url}/>;
                element.addEventListener("dragstart", event => event.preventDefault());
                return element; 
            }) }
        </div>
    }

    mountTo(parent){
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
let component = <Carousel data={[
    "https://static001.geekbang.org/resource/image/bb/21/bb38fb7c1073eaee1755f81131f11d21.jpg",
    "https://static001.geekbang.org/resource/image/1b/21/1b809d9a2bdf3ecc481322d7c9223c21.jpg",
    "https://static001.geekbang.org/resource/image/b6/4f/b6d65b2f12646a9fd6b8cb2b020d754f.jpg",
    "https://static001.geekbang.org/resource/image/73/e4/730ea9c393def7975deceb48b3eb6fe4.jpg",
]}/>
//component.title = "I'm a property title";
component.mountTo(document.body)
console.log(component)
//component.id = "b"
//component.setAttribute("id", "b");
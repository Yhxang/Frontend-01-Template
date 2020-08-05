import {createElement, Text, Wrapper} from "./createElement";
export class ListView{
    constructor(){
        this.children = [];
    }
    setAttribute(name, value){
        this[name] = value;
    }
    appendChild(child){
        this.children.push(child)
    }
    render(){
        let data = this.data;
        return <div class="list-view">
            {data.map(this.children[0])}
        </div>
    }
    mountTo(parent){
        this.render().mountTo(parent)
    }
}
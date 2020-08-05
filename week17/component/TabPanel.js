import {createElement, Text, Wrapper} from "./createElement";
export class TabPanel{
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.state = new Map();
    }
    setAttribute(name, value){
        this[name] = value;
    }
    appendChild(child){
        this.children.push(child);
    }
    select(i){
        for(let view of this.childViews){
            view.style.display = "none";
        }
        this.childViews[i].style.display = "";

        for(let view of this.titleViews){
            view.classList.remove("selected");
        }
        this.titleViews[i].classList.add("selected");
        //this.titleViews.innerText = this.children[i].title;
    }
    click(event){
        console.log(1)
    }
    render(){
        this.childViews = this.children.map(child => <div style="width:300px; min-height:300px;">{child}</div>);
        this.titleViews = this.children.map((child, i) => <span onClick={()=>this.select(i)} 
            style="background-color:lightgreen; margin:0 5px; width:300px; cursor:pointer">{child.getAttribute("title")}</span>);
        setTimeout(() => this.select(0),16)
        return <div class="panel" class="tab-panel" style="border:1px solid lightgreen; width:300px;">
            <h1 style=" margin:0">{this.titleViews}</h1>
            <div>
                {this.childViews}
            </div> 
        </div>
    }
    mountTo(parent){
        this.render().mountTo(parent);
    }
}
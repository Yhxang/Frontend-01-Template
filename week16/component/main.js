import {createElement, Text, Wrapper} from "./createElement";
// import {Carousel} from "./carousel.view";
import {Timeline, Animation} from "./animation";
import {cubicBezier} from "./cubicBezier";

class Carousel{
    constructor(config){
        this.children = [];
        this.attributes = new Map();
        this.properties = new Map();
        this.Timeline = new Timeline;
    }

    setAttribute(name, value){ // attribute
        this[name] = value;
    }

    render(){
        let children = this.data.map(url => {
            let element = <img src={url}/>;
            element.addEventListener("dragstart", event => event.preventDefault());
            return element; 
        });

        let root = <div class="carousel">
            { children }
        </div>;

        let position = 0;
        
        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length; // 取余运算
            
            let current = children[position];
            let next = children[nextPosition];
            children.forEach(ele => {
                ele.classList.remove("current");
                ele.classList.remove("next");
            })
            //current.style.transition = next.style.transition = "ease 0s";
            //current.style.transform = `translateX(${- 500 * position}px)`;
            //next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
            this.Timeline.stop()
            //let tl = new Timeline;
            let linear = t => t; // cubicBezier(0, 0, 1, 1); 
            let ease = cubicBezier(.25, .1, .25, 1); // ease 的参数数值是.25，.1，.25，1

            this.Timeline.add(new Animation(current.style, "transform", - 500 * position, - 500 - 500 * position, 500, 0, ease, v => `translateX(${v}px)`));
            this.Timeline.add(new Animation(next.style, "transform", 500 - 500 * nextPosition, - 500 * nextPosition, 500, 0, ease, v => `translateX(${v}px)`));
            current.classList.add('current');
            next.classList.add('next');
            position = nextPosition;

            this.Timeline.start();
            /*
            setTimeout(()=>{
                // current.style.transition = next.style.transition = "";

                // current.style.transform = `translateX(${- 100 - 100 * position}%)`;
                // current.classList.add('current');
                // next.style.transform = `translateX(${- 100 * nextPosition}%)`;
                // next.classList.add('next');

                // position = nextPosition;
            }, 16)
            */
            setTimeout(nextPic, 3000);
        }
        setTimeout(nextPic, 3000);

        root.addEventListener("mousedown", event => {
            let nextPosition = (position + 1) % this.data.length; 
            let lastPosition = (position - 1 + this.data.length) % this.data.length;

            let current = children[position];
            let next = children[nextPosition];
            let last = children[lastPosition];

            current.style.transition =  next.style.transition = last.style.transition = "ease 0s";
            let startX = event.clientX, startY = event.clientY;

            let move = event => {
                //console.log(event.clientX - startX, event.clientY - startY)
                current.style.transform = `translateX(${event.clientX - startX - 500 * position}px)`
                next.style.transform = `translateX(${event.clientX - startX + 500 - 500 * nextPosition}px)`
                last.style.transform = `translateX(${event.clientX - startX - 500 - 500 * lastPosition}px)`
            }
            let up = event => {

                let offset = 0;
                if(event.clientX - startX > 250){
                    offset = 1;
                }else if(event.clientX - startX < -250){
                    offset = -1;
                }

                current.style.transition =  next.style.transition = last.style.transition = "";

                current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
                next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`
                last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`

                position = (position - offset + this.data.length) % this.data.length;

                document.removeEventListener("mousemove", move);
                document.removeEventListener("mouseup", up);
            }
            document.addEventListener("mousemove", move);
            document.addEventListener("mouseup", up);
        })
        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent);
    }
}


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
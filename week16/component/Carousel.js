import {createElement, Text, Wrapper} from "./createElement";
import {Timeline, Animation} from "./animation";
import {cubicBezier} from "./cubicBezier";
import {enableGesture} from "./gesture"
export class Carousel{
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
        let nexPicStopHandler = null;

        let children = this.data.map((url, currentPosition) => {
            let offset = 0;

            let lastPosition = (currentPosition - 1 + this.data.length) % this.data.length;
            let nextPosition = (currentPosition + 1) % this.data.length;
            
            

            let onStart = () => {
                this.Timeline.pause(); // 中断动画
                clearTimeout(nexPicStopHandler); // 清除自动轮播

                let currentElement = children[currentPosition];
                let currentTransformValue = Number(currentElement.style.transform.match(/translateX\(([\s\S]+)px\)/)[1]);
                offset = currentTransformValue + 500 * currentPosition;
            }

            let onPan = event => {
                let {startX, clientX} = event.detail;
                let dx = clientX - startX;

                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                lastElement.style.transform = `translateX(${offset + dx - 500 - 500 * lastPosition}px)`;
                currentElement.style.transform = `translateX(${offset + dx - 500 * currentPosition}px)`;
                nextElement.style.transform = `translateX(${offset + dx + 500 - 500 * nextPosition}px)`;
            }
            
            let onPanend = event => {

                let dirction = 0;
                let {startX, clientX} = event.detail;
                let dx = clientX - startX;
                if(dx + offset > 250 || event.detail.isFlick && dx > 0){
                    //慢速向右拖动超过250像素，或者快速拖动且方向是右
                    dirction = 1;
                }else if(dx + offset < -250 || event.detail.isFlick && dx < 0){ 
                    //慢速向左拖动超过250像素，或者快速拖动且方向是左
                    dirction = -1;
                }
                this.Timeline.reset();
                this.Timeline.start();

                //let currentTransformValue = 
                let lastElement = children[lastPosition];
                let currentElement = children[currentPosition];
                let nextElement = children[nextPosition];

                let lastAnimation = new Animation(lastElement.style, "transform", offset + dx - 500 - 500 * lastPosition, dirction * 500 - 500 - 500 * lastPosition, 500, 0, ease, v => `translateX(${v}px)`);
                let currentAnimation = new Animation(currentElement.style, "transform", offset + dx - 500 * currentPosition, dirction * 500 - 500 * currentPosition, 500, 0, ease, v => `translateX(${v}px)`);
                let nextAnimation = new Animation(nextElement.style, "transform", offset + dx + 500 - 500 * nextPosition, dirction * 500 + 500 - 500 * nextPosition, 500, 0, ease, v => `translateX(${v}px)`);

                this.Timeline.add(lastAnimation);
                this.Timeline.add(currentAnimation);
                this.Timeline.add(nextAnimation);

                nexPicStopHandler = setTimeout(nextPic, 3000);
                // current.style.transform = `translateX(${offset * 500 - 500 * position}px)`
                // next.style.transform = `translateX(${offset * 500 + 500 - 500 * nextPosition}px)`
                // last.style.transform = `translateX(${offset * 500 - 500 - 500 * lastPosition}px)`

                position = (position - offset + this.data.length) % this.data.length;

            }
            let element = <img src={url} onStart={onStart} onPan={onPan} onPanend={onPanend} enableGesture={true}/>;
            element.style.transform = "translateX(0px)";
            element.addEventListener("dragstart", event => event.preventDefault());
            return element; 
        });

        let root = <div class="carousel">
            { children }
        </div>;

        let position = 0;
        this.Timeline.start();        

        let linear = t => t; // cubicBezier(0, 0, 1, 1); 
        let ease = cubicBezier(.25, .1, .25, 1); // ease 的参数数值是.25，.1，.25，1

        let nextPic = () => {
            let nextPosition = (position + 1) % this.data.length; // 取余运算
            
            let current = children[position];
            let next = children[nextPosition];
            // children.forEach(ele => {
            //     ele.classList.remove("current");
            //     ele.classList.remove("next");
            // })

            //current.style.transition = next.style.transition = "ease 0s";
            //current.style.transform = `translateX(${- 500 * position}px)`;
            //next.style.transform = `translateX(${500 - 500 * nextPosition}px)`;
            //this.Timeline.stop()
            //let tl = new Timeline;            

            this.Timeline.add(new Animation(current.style, "transform", - 500 * position, - 500 - 500 * position, 500, 0, ease, v => `translateX(${v}px)`));
            this.Timeline.add(new Animation(next.style, "transform", 500 - 500 * nextPosition, - 500 * nextPosition, 500, 0, ease, v => `translateX(${v}px)`));
            //current.classList.add('current');
            //next.classList.add('next');
            position = nextPosition;

            //this.Timeline.start();
            //console.log(this.Timeline.animations)
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
           nexPicStopHandler = setTimeout(nextPic, 3000);
        }
        nexPicStopHandler = setTimeout(nextPic, 3000);
        /*
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
        */
        return root;
    }

    mountTo(parent){
        this.render().mountTo(parent);
    }
}
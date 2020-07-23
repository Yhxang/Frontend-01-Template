export class Timeline{
    constructor(){
        this.animations = [];
        this.requestId = null;
        this.state = "inited";
    }
    tick(){
        let t = Date.now() - this.startTime;
        console.log(t)
        let animations = this.animations.filter(animation => !animation.finished); // 筛选出动画队列里还未执行完成的动画
        for(let animation of animations){ // 只循环未完成的动画
            
            let {object, property, template, start, end, duration, delay, timingFunction, startTime} = animation;

            let progression = timingFunction((t - delay - startTime) / duration); 
            // progression是过程百分比（0-1），timingFunction函数是根据时间进行的百分比
            if(t > duration + delay + startTime){
                progression = 1; // 当走完duration时，强制progression设为1，也就是到达end值
                animation.finished = true;
            }

            let value = animation.valueFromProgression(progression);
            //let value = start + progression * (end - start);
            // 最后的值是起始值加过程量，过程量则为过程比乘以全过程量

            object[property] = template(value);
            // 经过模板函数处理，如300被转换为translate(300px)，以便符合transform的值的格式
        }
        if(animations.length) // animations队列里不为空的话就继续tick，为空就没有必要继续tick了，减少性能损耗
            this.requestId = requestAnimationFrame(() => this.tick());
        /* 直接用箭头函数不需要bind this
        requestAnimationFrame(() => this.tick());
        requestAnimationFrame(function(){
            this.tick();
        }.bind(this));
        */
    }

    start(){
        if(this.state !== "inited")
            return;
        this.startTime = Date.now();
        this.tick();
        this.state = "playing";
    }

    pause(){
        if(this.state !== "playing")
            return;
        this.state = "paused";
        this.pauseTime = Date.now();
        if(this.requestId !== null)
            cancelAnimationFrame(this.requestId);
    }

    resume(){
        if(this.state !== "paused")
            return;
        this.state = "playing";
        this.startTime += Date.now() - this.pauseTime; 
        // 暂停后到恢复之间的时间间隔 加上 原来的startTime 就是新的startTime，
        // 其实相当于startTime这个时间戳向前移动了一段时间
        //this.startTime = this.pauseTime - this.startTime + Date.now()
        this.tick();
    }

    restart(){
        if(this.state === "playing")
            this.pause();
        this.animations = [];
        this.requestId = null;
        this.state = "playing";
        this.startTime = Date.now();
        this.pauseTime = null;
        this.tick();
    }

    add(animation, startTime){
        this.animations.push(animation);
        animation.finished = false;
        if(this.state == "playing")
            animation.startTime = startTime !== void 0 ? startTime : Date.now() - this.startTime;
        else
            animation.startTime = startTime !== void 0 ? startTime : 0;
    }
}
export class Animation{
    constructor(object, property, start, end, duration, delay, timingFunction, template){
        this.object = object;
        this.property = property;
        this.template = template || (v => v);
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        // this.timingFunction = timingFunction || ((start, end) => {
        //     return t => start + t / duration * (end - start)
        // });
    }
    valueFromProgression(progression){
        return this.start + progression * (this.end - this.start)
    }
}
// export class ColorAnimation extends Animation{
//     constructor(object, property, start, end, duration, delay, timingFunction, template){
//         super.call(this, ...arguments);
//         this.template = this.template || (v => `rgba(${v.r},${v.g},${v.b},${v.a})`)
//     }
//     valueFromProgression(progression){
//         return {
//             r: this.start.r + progression * (this.end.r - this.start.r),
//             g: this.start.g + progression * (this.end.g - this.start.g),
//             b: this.start.b + progression * (this.end.b - this.start.b),
//             a: this.start.g + progression * (this.end.a - this.start.a),
//         }
//     }
// }
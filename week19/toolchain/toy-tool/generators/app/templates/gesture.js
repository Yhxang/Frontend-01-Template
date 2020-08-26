export function enableGesture(element){

    let contexts = Object.create(null);

    let MOUSE_SYMBOL = Symbol("mouse");
    
    // 因为触屏touch也会同时触发mousedown事件，所以要加条件。
    // document.ontouchstart在触屏设备中存在，值默认为null；在非触屏不存在，值为undefined。
    // 因此可以由此排除掉当触屏时仍然监听mouse的情况。
    
    if(!("ontouchstart" in document)){ // 触屏不执行
        element.addEventListener("mousedown", event => {
            contexts[MOUSE_SYMBOL] = Object.create(null);

            start(event, contexts[MOUSE_SYMBOL]);
    
            let mousemove = event => {
                move(event, contexts[MOUSE_SYMBOL]);
            }
            let mouseend = event => {
                end(event, contexts[MOUSE_SYMBOL]);
                document.removeEventListener("mousemove", mousemove);
                document.removeEventListener("mouseup", mouseend)
            }
    
            document.addEventListener("mousemove", mousemove);
            document.addEventListener("mouseup", mouseend);
        })
    }
    // touch事件不需要在document上监听，因为天然具有目标锁定的特性
    element.addEventListener("touchstart", event => { 
        // touchEvent.changeTouches是一个多触控点的类数组集合
        for(let touch of event.changedTouches){
            // touch.idetifier是触控的识别符，在touch事件各阶段标识每个触控点。
            contexts[touch.identifier] = Object.create(null);
            start(touch, contexts[touch.identifier]);
        }
    })
    element.addEventListener("touchmove", event => {
        for(let touch of event.changedTouches){
            move(touch, contexts[touch.identifier]);
        }
    })
    element.addEventListener("touchend", event => {
        for(let touch of event.changedTouches){
            end(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    })
    element.addEventListener("touchcancel", event => { // 通常在系统弹窗打断时触发
        for(let touch of event.changedTouches){
            cancel(touch, contexts[touch.identifier]);
            delete contexts[touch.identifier];
        }
    })
    // 需要建立一个context来记录mouse、touch移动时的起始坐标及状态。
    let start = (point, context) => {
        element.dispatchEvent(new CustomEvent("start", {detail: {
            startX: point.startX,
            startY: point.startY,
            clientX: point.clientX,
            clientY: point.clientY
        }}))

        context.startX = point.clientX, context.startY = point.clientY;
    
        context.moves = [];
    
        context.isTap = true;
        context.isPan = false;
        context.isPress = false;
        context.timeoutHandler = setTimeout(() => {
            if(context.isPan) //pan的优先级最高，是pan了后就不会再变成press
                return;
            context.isTap = false;
            context.isPan = false;
            context.isPress = true;

            element.dispatchEvent(new CustomEvent("pressstart", {}))
        }, 500)
    }
    let move = (point, context) => {
        let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
        
        if(!context.isPan && dx ** 2 + dy ** 2 > 100){ // 移动超过距离判定为pan
            if(context.isPress)
                element.dispatchEvent(new CustomEvent("presscancel", {}))
            context.isTap = false;
            context.isPan = true;
            context.isPress = false;
            element.dispatchEvent(new CustomEvent("panstart", {detail: {
                startX: context.startX, // 因为这时已经移动了，所以要从真正的起点开始算，也就是context储存的
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY
            }}))
        }

        if(context.isPan){
            // 移动过程中点坐标与时间戳集合
            context.moves.push({
                dx, dy,
                t: Date.now()
            })
            // 过滤剩下300ms的点
            context.moves = context.moves.filter(record => Date.now() - record.t < 300);

            let event = new CustomEvent("pan", {
                detail: {
                    startX: context.startX, 
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY
                }
            })
            element.dispatchEvent(event);
        }
        //console.log("move", dx, dy)
    }
    let end = (point, context) => {
        if(context.isTap){
            //console.log("tap")
            element.dispatchEvent(new CustomEvent("tap", {}))
        }
        if(context.isPan){
            // 300ms前的第一个点与当前点的距离和时间计算出最后300ms移动速率，
            // 如果超过一定速度就把pan改判定为flick
            let dx = point.clientX - context.startX, dy = point.clientY - context.startY;
            let record = context.moves[0]; // 300ms前的第一个点
            let speed = Math.sqrt((record.dx - dx) ** 2 + (record.dy - dy) ** 2) / (Date.now() - record.t);
            //console.log(speed);

            let isFlick = speed > 2.5;
            if(isFlick){
                element.dispatchEvent(new CustomEvent("flick", {detail: {
                    startX: context.startX, 
                    startY: context.startY,
                    clientX: point.clientX,
                    clientY: point.clientY,
                    speed: speed //
                }}))
            }
            //console.log(context.moves)
            element.dispatchEvent(new CustomEvent("panend", {detail: {
                startX: context.startX, 
                startY: context.startY,
                clientX: point.clientX,
                clientY: point.clientY,
                speed: speed, // 速度
                isFlick: isFlick
            }}))
        }
        if(context.isPress){
            console.log("press")
        }
        clearTimeout(context.timeoutHandler)
    }
    let cancel = (point, context) => {
        clearTimeout(context.timeoutHandler)
        element.dispatchEvent(new CustomEvent("cancel", {}))
    }
}


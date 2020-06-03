function getStyle(element){
    if(!element.style)
        element.style = {};
    
    for(let prop in element.computedStyle){
        element.style[prop] = element.computedStyle[prop].value;

        if(element.style[prop].toString().match(/px$/))
            element.style[prop] = parseInt(element.style[prop]);
        if(element.style[prop].toString().match(/^[0-9\.]+$/))
            element.style[prop] = parseInt(element.style[prop]);
    }
    return element.style;
}

function layout(element){
    if(!element.computedStyle)
        return;
    
    var elementStyle = getStyle(element);

    if(elementStyle.display !== 'flex') // 暂时不处理非flex元素
        return;
    
    var items = element.children.filter(e => e.type === 'element'); // 排除文本节点

    items.sort(function(a, b){
        return (a.order || 0) - (b.order || 0);
    })

    var style = elementStyle;

    ['width', 'height'].forEach(size => {
        if(style[size] === 'auto' || style[size] === ''){
            style[size] = null;
        }
    })

    if(!style.flexDirction || style.flexDirction === "auto")
        style.flexDirction = 'row';
    if(!style.justifyContent || style.justifyContent === "auto")
        style.justifyContent = 'flex-start';
    if(!style.flexWrap || style.flexWrap === "auto")
        style.flexWrap = 'nowrap';
    if(!style.alignItems || style.alignItems === "auto")
        style.alignItems = "stretch";
    if(!style.alignContent || style.alignContent === "auto")
        style.alignContent = "stretch";
    
    var mainSize, mainStart, mainEnd, mainSign, mainBase,
    crossSize, crossStart, crossEnd, crossSign, crossBase;
    //main为主轴，cross是交叉轴，size是尺寸属性名，base是起点，sign是方向
    if(style.flexDirction === "row"){
        mainSize = "width";
        mainStart = "left";
        mainEnd = "right";
        mainSign = +1;
        mainBase = 0;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    }else if(style.flexDirction === "row-reverse"){
        mainSize = "width";
        mainStart = "right";
        mainEnd = "left";
        mainSign = -1;
        mainBase = style.width;

        crossSize = "height";
        crossStart = "top";
        crossEnd = "bottom";
    }else if(style.flexDirction === "column"){
        mainSize = "height";
        mainStart = "top";
        mainEnd = "bottom";
        mainSign = +1;
        mainBase = 0;

        crossSize = "width";
        crossStart = "left";
        crossEnd  = "right";
    }else if(style.flexDirction === "column-reverse"){
        mainSize = "height";
        mainStart = "bottom";
        mainEnd = "top";
        mainBase = -1;
        mainBase = style.height;

        crossSize = "width";
        crossStart = "left";
        crossEnd = "right";
    }

    if(style.flexWrap === "wrap-reverse"){
        var tmp = crossStart;
        crossStart = crossEnd;
        crossEnd = tmp;
        //crossBase = 
        crossSign = -1;
    }else{
        crossBase = 0;
        crossSign = 1;
    }

    // 父元素未设mainSize的情况，这时候父元素mainSize等于子元素mainSize之和
    var isAutoMainSize = false;
    if(!style[mainSize]){
        elementStyle[mainSize] = 0;
        for(var i = 0; i < items.length; i++){
            var item = items[i];
            itemStyle = getStyle(item);

            if(itemStyle[mainSize] !== null || itemStyle[mainSize] !== (void 0))
                elementStyle[mainSize] = elementStyle[mainSize] + itemStyle[mainSize];
        }
        isAutoMainSize = true;
    }

    // TODO: 实现flex-grow、flex-shrink
    var flexLine = []; // 单行
    var flexLines = [flexLine]; // 所有行

    var mainSpace = elementStyle[mainSize]; // 主轴剩余空间
    var crossSpace = 0; // 交叉轴剩余空间

    for(var i = 0; i < items.length; i++){
        var item = items[i];
        var itemStyle = getStyle(item);

        if(itemStyle[mainSize] === null){
            itemStyle[mainSize] = 0;
        }

        if(itemStyle.flex){
            flexLine.push(item); // 如果有flex属性，表示元素可伸缩，这时无论如何都能放进一行，直接push进去
        }else if(style.flexWrap === "nowrap" || isAutoMainSize){
            // 如果样式为不折行
            mainSpace -= itemStyle[mainSize];
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]); //交叉轴一行的高度取决于最高的元素的高度
            flexLine.push(item);
        }else{
            if(itemStyle[mainSize] > style[mainSize]){
                // 如果item尺寸超过父元素尺寸，则设置成父元素尺寸
                itemStyle[mainSize] = style[mainSize];
            }
            if(mainSpace < itemStyle[mainSize]){
                // 如果剩余尺寸放不下item，则换行，新建flexLine
                flexLine.mainSpace = mainSize;
                flexline.crossSpace = crossSpace;
                flexLine = [item];
                flexLines.push(flexLine);
                mainSpace = style[mainSize];
                crossSpace = 0;
            }else{
                flexLine.push(item);
            }
            if(itemStyle[crossSize] !== null && itemStyle[crossSize] !== (void 0))
                crossSpace = Math.max(crossSpace, itemStyle[crossSize]);

            mainSpace -= itemStyle[mainSize];
        }
    }
    flexLine.mainSpace = mainSpace;

    if(style.flexWrap === "nowrap" || isAutoMainSize){
        flexLine.crossSpace = (style[crossSize] !== undefined) ? style[crossSize] : crossSpace; //设为容器高，否则这一行的高
    }else{
        flexLine.crossSpace = crossSpace;
    }

    if(mainSpace < 0){
        // 当nowrap单行，主轴剩余空间为负时
        var scale = style[mainSize] / (style[mainSize] - mainSpace); // 计算缩放比
        var currentMain = mainBase;
        for(var i = 0; i < items.length; i++){
            var item = item[i];
            var itemStyle = getStyle(item);

            if(itemStyle.flex){
                itemStyle[mainSize] = 0; // 有flex属性的元素，直接设置宽度为0
                // 如果item主轴之和大于外壳宽度，有flex属性的宽度会变成零
            }

            itemStyle[mainSize] = itemStyle[mainSize] * scale; // 缩放尺寸

            itemStyle[mainStart] = currentMain;
            itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * mainSign;
            currentMain = itemStyle[mainEnd];
        }
    }else{
        // 多行
        flexLines.forEach(function(items){
            var mainSpace = items.mainSpace;
            var flexTotal = 0;
            for(let i = 0; i < items.length; i++){
                let item = items[i];
                let itemStyle = getStyle(item);
                
                if((itemStyle.flex !== null) && (itemStyle.flex !== (void 0)))
                    flexTotal += itemStyle.flex; // 只考虑 flex:1; 这种情况
            }

            if(flexTotal > 0){
                // 有flex元素
                let currentMain = mainBase;
                for(let i = 0; i < items.length; i++){
                    let item = items[i];
                    let itemStyle = getStyle(item);

                    if(itemStyle.flex){
                        itemStyle[mainSize] = (mainSpace / flexTotal) * itemStyle.flex;
                    }
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + itemStyle[mainSize] * mainSign;
                    currentMain = itemStyle[mainEnd];
                }
            }else{
                // 没有flex元素， justifyContent开始起作用
                if(style.justifyContent === "flex-start"){
                    var currentMain = mainBase;
                    var gap = 0;
                }
                if(style.justifyContent === "flex-end"){
                    var currentMain = mainSpace * mainSign + mainBase;
                    var gap = 0;
                }
                if(style.justifyContent === "center"){
                    var currentMain = mainSpace / 2 * mainSign + mainBase;
                    var gap = 0;
                }
                if(style.justifyContent === "space-between"){
                    var gap = mainSpace / (items.length - 1) * mainSign;
                    var currentMain = mainBase;
                }
                if(style.justifyContent === "space-around"){
                    var gap = mainSpace / items.length * mainSign;
                    var currentMain = gap / 2 + mainBase;
                }
                if(style.justifyContent === "space-evenly"){
                    var gap = mainSpace / (items.length + 1) * mainSign;
                    var currentMain = gap + mainBase;
                }
                for(let i = 0; i < items.length; i++){
                    let item = items[i];
                    let itemStyle = getStyle(item);
                    itemStyle[mainStart] = currentMain;
                    itemStyle[mainEnd] = itemStyle[mainStart] + mainSign * itemStyle[mainSize];
                    currentMain = itemStyle[mainEnd] + gap;
                }

            }
        })
    }

    // 计算交叉轴
    var crossSpace; // 容器的交叉轴剩余尺寸
    if(!style[crossSize]){ // 如果容器元素没写交叉轴尺寸
        crossSpace = 0;
        elementStyle[crossSize] = 0;
        for(let i = 0; i < flexLines.length; i++){
            elementStyle[crossSize] += flexLines[i].crossSpace; // 容器的交叉轴尺寸等于各行交叉轴尺寸之和
        }
    }else{
        crossSpace = style[crossSize];
        for(let i = 0; i < flexLines.length; i++){
            crossSpace -= flexLines[i].crossSpace;
        }
    }

    // 处理flex-wrap，如果是wrap-reverse，交叉轴起点其实就是容器的交叉轴尺寸
    if(style.flexWrap === "wrap-reverse"){
        crossBase = style[crossSize];
    }else{
        crossBase = 0;
    }

    // 处理align-content，确定每行的位置
    var lineSize = style[crossSize] / flexLines.length;
    var gap;

    if(style.alignContent === "flex-start"){
        crossBase += 0;
        gap = 0;
    }
    if(style.alignContent === "flex-end"){
        crossBase += crossSign * crossSpace;
        gap = 0;
    }
    if(style.alignContent === "center"){
        crossBase += crossSign * crossSpace / 2;
        gap = 0;
    }
    if(style.alignContent === "space-between"){
        crossBase += 0;
        gap = crossSpace / (flexLines.length - 1);
    }
    if(style.alignContent === "space-around"){
        gap = crossSpace / flexLines.length;
        crossBase += crossSign * gap / 2;
    }
    if(style.alignContent === "space-evenly"){
        gap = crossSpace / (flexLines.length + 1);
        crossBase += crossSign * gap;
    }
    if(style.alignContent === "stretch"){
        gap = 0;
        crossBase += 0;
    }

    // 处理 algin-items 和 align-self，确定每个元素在每行里的位置
    flexLines.forEach(function(items){
        // 如果容器align-content是stretch，一行的交叉轴尺寸就等于，
        // 一行自身的的crossSpace加上（容器的crossSpace除以行数（也就是平分了的容器剩余交叉轴空间））
        var lineCrossSize = style.alignContent === "stretch" ? 
        items.crossSpace + crossSpace / flexLines.length :
        items.crossSpace;
        
        for(let i = 0; i < items.length; i++){
            let item = items[i];
            let itemStyle = getStyle(item);

            let align = itemStyle.alignSelf || style.alignItems;

            if(itemStyle[crossSize] === null){
                itemStyle[crossSize] = (align === "stretch") ?
                lineCrossSize : 0;
            }

            if(align === "flex-start"){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }
            if(align === "flex-end"){
                itemStyle[crossEnd] = crossBase + crossSign * lineCrossSize;
                itemStyle[crossStart] = itemStyle[crossEnd] - crossSign * itemStyle[crossSize];
            }

            if(align === "center"){
                itemStyle[crossStart] = crossBase + crossSign * (lineCrossSize - itemStyle[crossSize]) / 2;
                itemStyle[crossEnd] = itemStyle[crossStart] + crossSign * itemStyle[crossSize];
            }

            if(align === "stretch"){
                itemStyle[crossStart] = crossBase;
                itemStyle[crossEnd] = crossBase + crossSign * ((itemStyle[crossSize] !== null && itemStyle[crossSize] != (void 0)) ? 
itemStyle[crossSize] : lineCrossSize);
                itemStyle[crossSize] = crossSign * (itemStyle[crossEnd] - itemStyle[crossStart]);
            }
            // 另外align还有baseline，这个不做处理
        }
        crossBase += crossSign * (lineCrossSize + gap);
    })
    // console.log('===========>')
    // console.log(items);
    // console.log('<==========')

}

module.exports = layout;
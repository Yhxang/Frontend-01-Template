
function matchById(element, selector){
    return element.id === selector.replace("#",""); // dom Function
}
function matchByClass(element, selector){
    return element.className.trim().split(/\s+/).includes(selector.replace(".","")); // dom Function
}
function matchByTag(element, selector){
    return element.tagName === selector.toUpperCase(); // dom Function
}

const compareAttribValueFunc = {
    ['~='] : (selVal, eleVal) => eleVal.trim().split(/\s+/).includes(selVal),
    ['|='] : (selVal, eleVal) => eleVal === selVal || eleVal.startsWith(`${selVal}-`),
    ['^='] : (selVal, eleVal) => eleVal.startsWith(selVal),
    ['$='] : (selVal, eleVal) => eleVal.endsWith(selVal),
    ['*='] : (selVal, eleVal) => eleVal.includes(selVal),
    ['='] : (selVal, eleVal) => eleVal === selVal
}

function matchByAttrib(element, selector){
    const attrReg = /\[(-?[_\w][_\w\d-]*)\s*(?:([~|^$*]?=)\s*([^\n\r\f\\]+))?\]/;
    const matched = selector.match(attrReg);
    
    if(!matched)
        return false;
    
    let [, selectorAttribName, selectorEqualType, selectorAttribValue] = matched;
    if(!element.hasAttribute(selectorAttribName)) // dom Function
        return false;
    
    if(!selectorEqualType)
        return true;
    
    selectorAttribValue = selectorAttribValue.replace(/["']/g, '');
    let elementAttribValue = element.getAttribute(selectorAttribName); // dom Function

    return compareAttribValueFunc[selectorEqualType](selectorAttribValue, elementAttribValue); 
}

function matchBySimpleSelector(element, selector){
    if(selector.startsWith("#")){
        return matchById(element, selector);
    }else if(selector.startsWith(".")){
        return matchByClass(element, selector);
    }else if(/^\[.+?\]$/.test(selector)){
        return matchByAttrib(element, selector);
    }else{
        return matchByTag(element, selector);
    }
    //TODO： 2.not 3.where has
}
function matchByCompoundSelector(element, selector){
    let compounds = selector.split(/(?=[\#\.\[])/g);

    return compounds.every((simpleSelector) => matchBySimpleSelector(element, simpleSelector));
}

// function matchBySelector(element, selector){
//     // TODO: 后代 ~ + > 
// }

// function matchBySelectorsGroup(element, selector){
//     // TODO: selectors_group
//     // matchBySelector(element, selector)
// }

function match(element, selector){
    //let rule = {selectors: ['body  #form > .form-title  ~ label +  [role]']}
    // let selectorParts =  rule.selectors[0].trim().replace(/(?<=[+>~])\s+/g,'').replace(/\s+(?=[ +>~])/g,'').split(/(?<=[ +>~])/g);

    //return matchByCompoundSelector(element, selectorParts);
    return matchByCompoundSelector(element, selector);
}
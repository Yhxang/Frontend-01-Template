
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
    if(selector.startsWith("#")){  // ID selectors
        return matchById(element, selector);
    }else if(selector.startsWith(".")){ // Class selectors
        return matchByClass(element, selector);
    }else if(/^\[.+?\]$/.test(selector)){ // Attribute selectors
        return matchByAttrib(element, selector);
    }else if(/:not\((\S+)\)/.test(selector)){ // negation pseudo-class
        return !matchBySimpleSelector(element, RegExp.$1);
    }else{
        return matchByTag(element, selector);
    }
    //TODO： 2.not 3.where has
}
function matchByCompoundSelector(element, selector){
    // 'div#id.cls[attr]:not(#id)' --> ['#id', '.cls', '[attr]', ':not(#id)']
    let compounds = selector.split(/(?<!\([^\)]*?)(?=[#\.\[:])/g); // 查找后方是 #.[: 符号中的其中一种且前方不是左括号 的位置并分割开。
    return compounds.every((simpleSelector) => matchBySimpleSelector(element, simpleSelector));
}

function getNextElementKey(combinator) {
    return {
      '>': 'parentElement',
      ' ': 'parentElement',
      '+': 'previousElementSibling',
      '~': 'previousElementSibling',
    }[combinator]
}

function findMatchedElement(element, selectorPart){
    const [selector, combinator] = selectorPart.split(/(?<=[ ~+>])/)
    const nextElementKey = getNextElementKey(combinator);

    if (/^[>+]$/.test(combinator)) {  // Child combinator OR Next-sibling combinator
        element = element[nextElementKey]
        if (!matchByCompoundSelector(element, selector)) {
          element = null
        }
      } else if (/^[ ~]$/.test(combinator)) {  // Descendant combinator OR Subsequent-sibling combinator
        do {
          element = element[nextElementKey]
        } while (element && !matchByCompoundSelector(element, selector))
      } else if (!matchByCompoundSelector(element, selector)) { // 唯一没有combinator的当前元素
        element = null
      }
      return element || null
}
// function matchBySelector(element, selector){
//     // TODO: 后代 ~ + > 
// }

// function matchBySelectorsGroup(element, selector){
//     // TODO: selectors_group
//     // matchBySelector(element, selector)
// }

function match(element, rule){
    //let rule = {selectors: ['body  #form > .form-title  ~ label +  [role]']}
    const selectorParts = rule.trim().replace(/(?<=[~+>])\s+/g, '').replace(/\s+(?=[ ~+>])/g, '').split(/(?<=[ ~+>])/g)
    while (element && selectorParts.length) {
        element = findMatchedElement(element, selectorParts.pop())
    }
    return !!element
}
# 查找JavaScript的Realm中的内置对象，并用G6引擎画出来

在[上一节](../week04/NOTE.md)中，使用**广度优先**搜索内置对象，查询[G6文档](https://g6.antv.vision/zh/docs/api/Graph)得出数据格式必须是：
```javascript
data = {id: "root", children:[
    {id: "child1"},
    {id: "child2"},
    {id: "child3", children:[
        {id: "grandson1"},
        {id: "grandson2"}
    ]}
]}
```
因此，改用**深度优先**搜索，更容易形成G6需要的数据结构。修改代码，最后如下：
```javascript
var set = new Set();
var globalProperties = ["eval", "isFinite", "isNaN", "parseFloat", "parseInt", "decodeURI", "decodeURIComponent", "encodeURI", "encodeURIComponent", "Object", "Function", "Boolean", "Symbol", "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "Number", "BigInt", "Math", "Date", "String", "RegExp", "Array", "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array", "Map", "Set", "WeakMap", "WeakSet", "ArrayBuffer", "SharedArrayBuffer", "Atomics", "DataView", "JSON", "Promise", "Reflect", "Proxy", "Intl", "WebAssembly"]
var queue = [];
for (let p of globalProperties){
    queue.push({
        path: p,
        object: this[p] // this -> window/global
    })
}

// 使用递归深度优先查询
let current;
let data = {id: "内置对象", children: []};
while(queue.length){
    current = queue.shift();
    data.children.push(findObject(current));
}

// 编写递归函数findObject
function findObject(objmsg, data){
    let {path: path, object: obj}  = objmsg;

    if(set.has(obj)) return;
    set.add(obj);

    data = data || {};
    data.id = path;

    let PropertyNames = Object.getOwnPropertyNames(obj);    
    if(!PropertyNames.length) return;
    for (let p of PropertyNames){
        let property = Object.getOwnPropertyDescriptor(obj, p);
        
        if( (property.value != null && typeof property.value == "object") || (typeof property.value == "function") ){
            if(!set.has(property.value)){
                let children = data.children = data.children ? data.children : [];   
                let child = children[children.length] = {};
                findObject({path: p, object: property.value}, child);
            }
        }

        if(property.hasOwnProperty("get") && property.get instanceof Object){
            if(!set.has(property.get)){
                let children = data.children = data.children ? data.children : [];   
                let child = children[children.length] = {};
                findObject({path: p, object: property.get}, child);
            }
        }

        if(property.hasOwnProperty("set") && property.set instanceof Object){
            if(!set.has(property.set)){
                let children = data.children = data.children ? data.children : [];    
                let child = children[children.length] = {}; 
                findObject({path: p, object: property.set}, child);
            }
        }

    }
    return data;
}
```
* 得出data数据如下：
```javascript
{"id":"内置对象","children":[{"id":"eval"},{"id":"isFinite"},{"id":"isNaN"},{"id":"parseFloat"},{"id":"parseInt"},{"id":"decodeURI"},{"id":"decodeURIComponent"},{"id":"encodeURI"},{"id":"encodeURIComponent"},{"id":"Object","children":[{"id":"prototype","children":[{"id":"__defineGetter__"},{"id":"__defineSetter__"},{"id":"hasOwnProperty"},{"id":"__lookupGetter__"},{"id":"__lookupSetter__"},{"id":"isPrototypeOf"},{"id":"propertyIsEnumerable"},{"id":"toString"},{"id":"valueOf"},{"id":"__proto__"},{"id":"__proto__"},{"id":"toLocaleString"}]},{"id":"assign"},{"id":"getOwnPropertyDescriptor"},{"id":"getOwnPropertyDescriptors"},{"id":"getOwnPropertyNames"},{"id":"getOwnPropertySymbols"},{"id":"is"},{"id":"preventExtensions"},{"id":"seal"},{"id":"create"},{"id":"defineProperties"},{"id":"defineProperty"},{"id":"freeze"},{"id":"getPrototypeOf"},{"id":"setPrototypeOf"},{"id":"isExtensible"},{"id":"isFrozen"},{"id":"isSealed"},{"id":"keys"},{"id":"entries"},{"id":"fromEntries"},{"id":"values"}]},{"id":"Function","children":[{"id":"prototype","children":[{"id":"arguments"},{"id":"apply"},{"id":"bind"},{"id":"call"},{"id":"toString"}]}]},{"id":"Boolean","children":[{"id":"prototype","children":[{"id":"toString"},{"id":"valueOf"}]}]},{"id":"Symbol","children":[{"id":"prototype","children":[{"id":"toString"},{"id":"valueOf"},{"id":"description"}]},{"id":"for"},{"id":"keyFor"}]},{"id":"Error","children":[{"id":"prototype","children":[{"id":"toString"}]},{"id":"captureStackTrace"}]},{"id":"EvalError","children":[{"id":"prototype"}]},{"id":"RangeError","children":[{"id":"prototype"}]},{"id":"ReferenceError","children":[{"id":"prototype"}]},{"id":"SyntaxError","children":[{"id":"prototype"}]},{"id":"TypeError","children":[{"id":"prototype"}]},{"id":"URIError","children":[{"id":"prototype"}]},{"id":"Number","children":[{"id":"prototype","children":[{"id":"toExponential"},{"id":"toFixed"},{"id":"toPrecision"},{"id":"toString"},{"id":"valueOf"},{"id":"toLocaleString"}]},{"id":"isFinite"},{"id":"isInteger"},{"id":"isNaN"},{"id":"isSafeInteger"}]},{"id":"BigInt","children":[{"id":"prototype","children":[{"id":"toLocaleString"},{"id":"toString"},{"id":"valueOf"}]},{"id":"asUintN"},{"id":"asIntN"}]},{"id":"Math","children":[{"id":"abs"},{"id":"acos"},{"id":"acosh"},{"id":"asin"},{"id":"asinh"},{"id":"atan"},{"id":"atanh"},{"id":"atan2"},{"id":"ceil"},{"id":"cbrt"},{"id":"expm1"},{"id":"clz32"},{"id":"cos"},{"id":"cosh"},{"id":"exp"},{"id":"floor"},{"id":"fround"},{"id":"hypot"},{"id":"imul"},{"id":"log"},{"id":"log1p"},{"id":"log2"},{"id":"log10"},{"id":"max"},{"id":"min"},{"id":"pow"},{"id":"random"},{"id":"round"},{"id":"sign"},{"id":"sin"},{"id":"sinh"},{"id":"sqrt"},{"id":"tan"},{"id":"tanh"},{"id":"trunc"}]},{"id":"Date","children":[{"id":"prototype","children":[{"id":"toString"},{"id":"toDateString"},{"id":"toTimeString"},{"id":"toISOString"},{"id":"toUTCString"},{"id":"getDate"},{"id":"setDate"},{"id":"getDay"},{"id":"getFullYear"},{"id":"setFullYear"},{"id":"getHours"},{"id":"setHours"},{"id":"getMilliseconds"},{"id":"setMilliseconds"},{"id":"getMinutes"},{"id":"setMinutes"},{"id":"getMonth"},{"id":"setMonth"},{"id":"getSeconds"},{"id":"setSeconds"},{"id":"getTime"},{"id":"setTime"},{"id":"getTimezoneOffset"},{"id":"getUTCDate"},{"id":"setUTCDate"},{"id":"getUTCDay"},{"id":"getUTCFullYear"},{"id":"setUTCFullYear"},{"id":"getUTCHours"},{"id":"setUTCHours"},{"id":"getUTCMilliseconds"},{"id":"setUTCMilliseconds"},{"id":"getUTCMinutes"},{"id":"setUTCMinutes"},{"id":"getUTCMonth"},{"id":"setUTCMonth"},{"id":"getUTCSeconds"},{"id":"setUTCSeconds"},{"id":"valueOf"},{"id":"getYear"},{"id":"setYear"},{"id":"toJSON"},{"id":"toLocaleString"},{"id":"toLocaleDateString"},{"id":"toLocaleTimeString"}]},{"id":"now"},{"id":"parse"},{"id":"UTC"}]},{"id":"String","children":[{"id":"prototype","children":[{"id":"anchor"},{"id":"big"},{"id":"blink"},{"id":"bold"},{"id":"charAt"},{"id":"charCodeAt"},{"id":"codePointAt"},{"id":"concat"},{"id":"endsWith"},{"id":"fontcolor"},{"id":"fontsize"},{"id":"fixed"},{"id":"includes"},{"id":"indexOf"},{"id":"italics"},{"id":"lastIndexOf"},{"id":"link"},{"id":"localeCompare"},{"id":"match"},{"id":"matchAll"},{"id":"normalize"},{"id":"padEnd"},{"id":"padStart"},{"id":"repeat"},{"id":"replace"},{"id":"search"},{"id":"slice"},{"id":"small"},{"id":"split"},{"id":"strike"},{"id":"sub"},{"id":"substr"},{"id":"substring"},{"id":"sup"},{"id":"startsWith"},{"id":"toString"},{"id":"trim"},{"id":"trimStart"},{"id":"trimEnd"},{"id":"toLocaleLowerCase"},{"id":"toLocaleUpperCase"},{"id":"toLowerCase"},{"id":"toUpperCase"},{"id":"valueOf"}]},{"id":"fromCharCode"},{"id":"fromCodePoint"},{"id":"raw"}]},{"id":"RegExp","children":[{"id":"prototype","children":[{"id":"exec"},{"id":"dotAll"},{"id":"flags"},{"id":"global"},{"id":"ignoreCase"},{"id":"multiline"},{"id":"source"},{"id":"sticky"},{"id":"unicode"},{"id":"compile"},{"id":"toString"},{"id":"test"}]},{"id":"input"},{"id":"input"},{"id":"$_"},{"id":"$_"},{"id":"lastMatch"},{"id":"lastMatch"},{"id":"$&"},{"id":"$&"},{"id":"lastParen"},{"id":"lastParen"},{"id":"$+"},{"id":"$+"},{"id":"leftContext"},{"id":"leftContext"},{"id":"$`"},{"id":"$`"},{"id":"rightContext"},{"id":"rightContext"},{"id":"$'"},{"id":"$'"},{"id":"$1"},{"id":"$1"},{"id":"$2"},{"id":"$2"},{"id":"$3"},{"id":"$3"},{"id":"$4"},{"id":"$4"},{"id":"$5"},{"id":"$5"},{"id":"$6"},{"id":"$6"},{"id":"$7"},{"id":"$7"},{"id":"$8"},{"id":"$8"},{"id":"$9"},{"id":"$9"}]},{"id":"Array","children":[{"id":"prototype","children":[{"id":"concat"},{"id":"copyWithin"},{"id":"fill"},{"id":"find"},{"id":"findIndex"},{"id":"lastIndexOf"},{"id":"pop"},{"id":"push"},{"id":"reverse"},{"id":"shift"},{"id":"unshift"},{"id":"slice"},{"id":"sort"},{"id":"splice"},{"id":"includes"},{"id":"indexOf"},{"id":"join"},{"id":"keys"},{"id":"entries"},{"id":"values"},{"id":"forEach"},{"id":"filter"},{"id":"flat"},{"id":"flatMap"},{"id":"map"},{"id":"every"},{"id":"some"},{"id":"reduce"},{"id":"reduceRight"},{"id":"toLocaleString"},{"id":"toString"}]},{"id":"isArray"},{"id":"from"},{"id":"of"}]},{"id":"Int8Array","children":[{"id":"prototype"}]},{"id":"Uint8Array","children":[{"id":"prototype"}]},{"id":"Uint8ClampedArray","children":[{"id":"prototype"}]},{"id":"Int16Array","children":[{"id":"prototype"}]},{"id":"Uint16Array","children":[{"id":"prototype"}]},{"id":"Int32Array","children":[{"id":"prototype"}]},{"id":"Uint32Array","children":[{"id":"prototype"}]},{"id":"Float32Array","children":[{"id":"prototype"}]},{"id":"Float64Array","children":[{"id":"prototype"}]},{"id":"BigInt64Array","children":[{"id":"prototype"}]},{"id":"BigUint64Array","children":[{"id":"prototype"}]},{"id":"Map","children":[{"id":"prototype","children":[{"id":"get"},{"id":"set"},{"id":"has"},{"id":"delete"},{"id":"clear"},{"id":"entries"},{"id":"forEach"},{"id":"keys"},{"id":"size"},{"id":"values"}]}]},{"id":"Set","children":[{"id":"prototype","children":[{"id":"has"},{"id":"add"},{"id":"delete"},{"id":"clear"},{"id":"entries"},{"id":"forEach"},{"id":"size"},{"id":"values"}]}]},{"id":"WeakMap","children":[{"id":"prototype","children":[{"id":"delete"},{"id":"get"},{"id":"set"},{"id":"has"}]}]},{"id":"WeakSet","children":[{"id":"prototype","children":[{"id":"delete"},{"id":"has"},{"id":"add"}]}]},{"id":"ArrayBuffer","children":[{"id":"prototype","children":[{"id":"byteLength"},{"id":"slice"}]},{"id":"isView"}]},{"id":"SharedArrayBuffer","children":[{"id":"prototype","children":[{"id":"byteLength"},{"id":"slice"}]}]},{"id":"Atomics","children":[{"id":"load"},{"id":"store"},{"id":"add"},{"id":"sub"},{"id":"and"},{"id":"or"},{"id":"xor"},{"id":"exchange"},{"id":"compareExchange"},{"id":"isLockFree"},{"id":"wait"},{"id":"wake"},{"id":"notify"}]},{"id":"DataView","children":[{"id":"prototype","children":[{"id":"buffer"},{"id":"byteLength"},{"id":"byteOffset"},{"id":"getInt8"},{"id":"setInt8"},{"id":"getUint8"},{"id":"setUint8"},{"id":"getInt16"},{"id":"setInt16"},{"id":"getUint16"},{"id":"setUint16"},{"id":"getInt32"},{"id":"setInt32"},{"id":"getUint32"},{"id":"setUint32"},{"id":"getFloat32"},{"id":"setFloat32"},{"id":"getFloat64"},{"id":"setFloat64"},{"id":"getBigInt64"},{"id":"setBigInt64"},{"id":"getBigUint64"},{"id":"setBigUint64"}]}]},{"id":"JSON","children":[{"id":"parse"},{"id":"stringify"}]},{"id":"Promise","children":[{"id":"prototype","children":[{"id":"then"},{"id":"catch"},{"id":"finally"}]},{"id":"all"},{"id":"race"},{"id":"resolve"},{"id":"reject"},{"id":"allSettled"}]},{"id":"Reflect","children":[{"id":"defineProperty"},{"id":"deleteProperty"},{"id":"apply"},{"id":"construct"},{"id":"get"},{"id":"getOwnPropertyDescriptor"},{"id":"getPrototypeOf"},{"id":"has"},{"id":"isExtensible"},{"id":"ownKeys"},{"id":"preventExtensions"},{"id":"set"},{"id":"setPrototypeOf"}]},{"id":"Proxy","children":[{"id":"revocable"}]},{"id":"Intl","children":[{"id":"getCanonicalLocales"},{"id":"DateTimeFormat","children":[{"id":"prototype","children":[{"id":"resolvedOptions"},{"id":"formatToParts"},{"id":"format"},{"id":"formatRange"},{"id":"formatRangeToParts"}]},{"id":"supportedLocalesOf"}]},{"id":"NumberFormat","children":[{"id":"prototype","children":[{"id":"resolvedOptions"},{"id":"formatToParts"},{"id":"format"}]},{"id":"supportedLocalesOf"}]},{"id":"Collator","children":[{"id":"prototype","children":[{"id":"resolvedOptions"},{"id":"compare"}]},{"id":"supportedLocalesOf"}]},{"id":"v8BreakIterator","children":[{"id":"prototype","children":[{"id":"resolvedOptions"},{"id":"adoptText"},{"id":"first"},{"id":"next"},{"id":"current"},{"id":"breakType"}]},{"id":"supportedLocalesOf"}]},{"id":"PluralRules","children":[{"id":"prototype","children":[{"id":"resolvedOptions"},{"id":"select"}]},{"id":"supportedLocalesOf"}]},{"id":"RelativeTimeFormat","children":[{"id":"prototype","children":[{"id":"resolvedOptions"},{"id":"format"},{"id":"formatToParts"}]},{"id":"supportedLocalesOf"}]},{"id":"ListFormat","children":[{"id":"prototype","children":[{"id":"resolvedOptions"},{"id":"format"},{"id":"formatToParts"}]},{"id":"supportedLocalesOf"}]},{"id":"Locale","children":[{"id":"prototype","children":[{"id":"toString"},{"id":"maximize"},{"id":"minimize"},{"id":"language"},{"id":"script"},{"id":"region"},{"id":"baseName"},{"id":"calendar"},{"id":"caseFirst"},{"id":"collation"},{"id":"hourCycle"},{"id":"numeric"},{"id":"numberingSystem"}]}]}]},{"id":"WebAssembly","children":[{"id":"compile","children":[{"id":"prototype"}]},{"id":"validate","children":[{"id":"prototype"}]},{"id":"instantiate","children":[{"id":"prototype"}]},{"id":"compileStreaming","children":[{"id":"prototype"}]},{"id":"instantiateStreaming","children":[{"id":"prototype"}]},{"id":"Module","children":[{"id":"prototype"},{"id":"imports","children":[{"id":"prototype"}]},{"id":"exports","children":[{"id":"prototype"}]},{"id":"customSections","children":[{"id":"prototype"}]}]},{"id":"Instance","children":[{"id":"prototype","children":[{"id":"exports","children":[{"id":"prototype"}]}]}]},{"id":"Table","children":[{"id":"prototype","children":[{"id":"length","children":[{"id":"prototype"}]},{"id":"grow","children":[{"id":"prototype"}]},{"id":"get","children":[{"id":"prototype"}]},{"id":"set","children":[{"id":"prototype"}]}]}]},{"id":"Memory","children":[{"id":"prototype","children":[{"id":"grow","children":[{"id":"prototype"}]},{"id":"buffer","children":[{"id":"prototype"}]}]}]},{"id":"Global","children":[{"id":"prototype","children":[{"id":"valueOf","children":[{"id":"prototype"}]},{"id":"value","children":[{"id":"prototype"}]},{"id":"value","children":[{"id":"prototype"}]}]}]},{"id":"CompileError","children":[{"id":"prototype"}]},{"id":"LinkError","children":[{"id":"prototype"}]},{"id":"RuntimeError","children":[{"id":"prototype"}]}]}]}
```
* 最后调用G6的API进行渲染：
```javascript
const width = document.getElementById('mountNode').scrollWidth;
const height = document.getElementById('mountNode').scrollHeight || window.innerHeight;
const graph = new G6.TreeGraph({
    container: 'mountNode',
    width,
    height,
    modes: {
    default: [
        {
        type: 'collapse-expand',
        onChange: function onChange(item, collapsed) {
            const data = item.get('model').data;
            data.collapsed = collapsed;
            return true;
        },
        },
        'drag-canvas',
        'zoom-canvas',
    ],
    },
    defaultNode: {
    size: 26,
    anchorPoints: [
        [0, 0.5],
        [1, 0.5],
    ],
    style: {
        fill: '#C6E5FF',
        stroke: '#5B8FF9',
    },
    },
    defaultEdge: {
    type: 'cubic-horizontal',
    style: {
        stroke: '#A3B1BF',
    },
    },
    layout: {
    type: 'mindmap',
    direction: 'H',
    getHeight: () => {
        return 16;
    },
    getWidth: () => {
        return 16;
    },
    getVGap: () => {
        return 10;
    },
    getHGap: () => {
        return 50;
    },
    },
});

let centerX = 0;
graph.node(function(node) {
    if (node.id === 'Modeling Methods') {
    centerX = node.x;
    }

    return {
    label: node.id,
    labelCfg: {
        position:
        node.children && node.children.length > 0
            ? 'left'
            : node.x > centerX
            ? 'right'
            : 'left',
        offset: 5,
    },
    };
});

graph.data(data);
graph.render();
graph.fitView();
```
* 渲染出图：
![](objects.jpg)
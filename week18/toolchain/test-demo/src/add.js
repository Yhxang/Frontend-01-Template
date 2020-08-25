export function add(a, b){
    return a + b;
}
// babel转换时不可以用>转换，要用-out-file/-o参数转换，否则有编码问题
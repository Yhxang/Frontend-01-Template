function UTF8_Encoding(string){
    const len = string.length;
    let result = '';
    for (let i = 0; i < len; i++){
        let cp = string.codePointAt(i);
        let bits;
        if(cp <= 0x7F){
            bits = cp.toString(2);
        }else if(cp <= 0x07FF){
            bits = cp.toString(2).padStart(11,'0').replace(/(\d{5})(\d{6})/,'110$110$2');
        }else if(cp <= 0xFFFF){
            bits = cp.toString(2).padStart(16,'0').replace(/(\d{4})(\d{6})(\d{6})/,'1110$110$210$3');
        }else if(cp <= 0x10FFFF){
            bits = cp.toString(2).padStart(21,'0').replace(/(\d{3})(\d{6})(\d{6})(\d{6})/,'11110$110$210$310$4');
        }else{
            throw Error('超出转码范围');
        }
        result += parseInt(bits,2).toString(16).match(/[0-9a-fA-F]{2}/g).map(e => '\\x' + e.toUpperCase()).join('');
    } 
    return result;
}
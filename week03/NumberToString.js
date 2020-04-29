function convertNumberToString(number, x){
    if(arguments.length < 2){
        x = 10;
    }
    var string = '';
    var sign = 1;
    if(number == 0){
        return '0';
    }else if(number > 0){
        sign = 1;
    }else{
        sign = -1;
    }
    number = Math.abs(number);
    var arr = [];
    if(x == 10){
        var integer = Math.floor(number);
        var fraction = number - integer;
        while(integer > 0){
            string = String(integer % x) + string; //拿到数字最后一位
            integer = Math.floor(integer / x);
        }
        if(fraction !== 0){
            string += ".";
        }
        var cishu = 10; //可容忍的精度丢失的倍数
        while(fraction > Number.EPSILON * cishu){
            var num = fraction * x;
            integer =  Math.floor(num);
            fraction = num - integer;
            string += String(integer)
        }  
    }else{
        var zhengshu = number;
        do{
            zhengshu = Math.floor( number / x );
            arr.push( number % x);
            number = zhengshu; 
        }while(number > 0);
        string = arr.reverse().map(e=> charIndexMapRev(e)).join('');
    }
    if(sign == -1){
        string = '-' + string;  
    } 
    return string;
} 
function charIndexMapRev(index){
    if(index <= 9){
        return String.fromCodePoint(index + '0'.codePointAt(0));
    }else{
        return String.fromCodePoint(index - 10 + 'A'.codePointAt(0));
    }
}

console.log(convertNumberToString(0, 10))
console.log(convertNumberToString(100.1, 10));
console.log(convertNumberToString(-100.1, 10));
console.log(convertNumberToString(15, 16));
console.log(convertNumberToString(255, 16));
console.log(convertNumberToString(-255, 16));
function charIndexMap (char){
    if(/\d/.test(char)){
        return char.codePointAt(0) - '0'.codePointAt(0);
    }else if(/[a-zA-Z]/.test(char)){
        return char.toLowerCase().codePointAt(0) - 'a'.toLowerCase().codePointAt(0) + 10;
    }else{
        throw Error("错误的数字字符");
    }
}

function charIndexMapRev(index){
    if(index <= 9){
        return String.fromCodePoint(index + '0'.codePointAt(0));
    }else{
        return String.fromCodePoint(index - 10 + 'a'.codePointAt(0));
    }
}
function convertStringToNumber(string, x){
    if(arguments.length < 2){
        x = 10;
    }
    string = string.replace(/\s+(.*)\s+/g,'$1');    
    var matchs = string.match(/^([\+\-]?)(.*)/);
    var Sign = matchs[1] == "-" ? -1 : 1;
    string = matchs[2];
    var [DigitsChars, ExponentChars] = [ string ];
    if(x == 10){
        [DigitsChars, ExponentChars] =  string.split(/[eE]/);
    }
    var [integer, fraction] = DigitsChars.split('.');
    var IntegerChars = integer && integer.split('');
    var fractionChars = fraction && fraction.split('');
    var number = 0;
    var i = 0;
    for(let i = 0, len = IntegerChars.length; i < len; i++){
        number *= x;
        number += charIndexMap(IntegerChars[i]);
    }
    if(typeof fractionChars !== 'undefined'){
        let fraction = 1;
        let i = 0;
        for(len = fractionChars.length, fraction = 1; i < len; i++){
            fraction /= x;
            number += charIndexMap(fractionChars[i]) * fraction;
        }
        number = Math.floor(number*x**i) / x**i;
    }
    if(ExponentChars){
        number *= 10 ** convertStringToNumber(ExponentChars);
    }
    number *= Sign;
    return number;
}
assert1(0, '0');
assert1(0, '+0');
assert1(0, '-0');
assert1(123, '123');
assert1(123, '  123 ');
assert1(.123, '.123');
assert1(1.234, '1.234');
assert1(12, '1.2E1');
assert1(0.012, '1.2E-2');
assert1(1234, '1.234E3');
assert1(1234, '+1.234e3');
assert1(-1234, '-1.234e3');
assert1(-0.00123, '-1.23e-3');
assert1(255, 'ff', 16); // 十六进制
assert1(65279, 'FEFF', 16); // 十六进制
assert1(120, '170', 8); // 八进制
assert1(6, '110', 2); // 二进制
assert1(-1234.56, '-1.23456e3'); //精度出现问题

function assert1(number, string, radix){
    if (typeof radix !== 'undefined'){
        let result = convertStringToNumber(string, radix);
        console.assert(number === result, `${number} !== convertStringToNumber("${string}", ${radix}),${result}`);
    }else{
        let result = convertStringToNumber(string);
        console.assert(number === convertStringToNumber(string), `${number} !== convertStringToNumber("${string}"),${result}`);
    }
}


function convertNumberToString(number, x){
    var integer = Math.floor(number);
    var fraction = number - integer;
    var string = '';
    while(integer > 0){
        string += String(integer % x) + string; //拿到数字最后一位
        integer = Math.floor(integer / x);
    }
    return string;
} 
convertNumberToString(12345,10);





/*
Number与直接量写法不一致：
010 //output: 8
Number('010') //output: 10
直接量010默认为八进制 

Number与parseInt表现不一致：
Number('1.23e2')// output: 123
parseInt('1.23e2') //output: 1
结果1：parseInt不能转科学计数法
Number('0b11') //output: 3
parseInt('0b11') //output: 0
结果2：parseInt可以转0x开头的十六进制，但不能转0b、0o开头的二进制和八进制字符串

究其原因，科学计数法的E/e、二进制开头的B/b、八进制开头的O/o都是十六进制的合法数字，
parseInt无法区分是功能字符还是十六进制的合法数字，所以parseInt(string,radix)方法中，
转二进制和八进制时，只能在radix设置进制，string
*/



/*
StringNumericLiteral :::
    StrWhiteSpace<opt>
    StrWhiteSpace<opt> StrNumericLiteral StrWhiteSpace<opt>
*/
//StringNumericLiteral = /[ \t\v\f\uFEFF\n\r\u2028\u2029]+(?<Sign>[+-]?)(?<Inf>Infinity)|(?<Hex>(?:0x)?)(?:([0-9A-Fa-f]+(?:\.(?<fra1>[0-9]*))?)|(?:\.(?<fra2>[0-9]*)))(?<Expon>[eE](?<Expchar>[+-]?[0-9]+))?)[ \t\v\f\uFEFF\n\r\u2028\u2029]+/

StringNumericLiteral = /[ \t\v\f\uFEFF\n\r\u2028\u2029]*(?<Sign>[+-]?)((?<Dec>Infinity|(?:(?:[0-9]+(?:\.[0-9]*)?)|(?:\.[0-9]*))(?:[eE][+-]?[0-9]+)?)|(?<Bin>0[Bb][01]+)|(?<Oct>0[Oo][0-7]+)|(?<Hex>0[Xx][0-9A-Fa-f]+))[ \t\v\f\uFEFF\n\r\u2028\u2029]*/

//StringNumericLiteral = /[ \t\v\f\uFEFF\n\r\u2028\u2029]+(Infinity|(?:(?:[0-9]+(?:\.[0-9]*)?)|(?:\.[0-9]*))(?:[eE][+-]?[0-9]+)?)|(?<Bin>0[Bb][01]+)|(?<Oct>0[Oo][0-7]+)|(?<Hex>0[Xx][0-9A-Fa-f]+)[ \t\v\f\uFEFF\n\r\u2028\u2029]+/
StrWhiteSpace = /[ \t\v\f\uFEFF\n\r\u2028\u2029]+/
/*
StrNumericLiteral::
    StrDecimalLiteral
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral
    // 文档中除十进制外的后三者都不包括负数，如-0b11,-0o17,-0xff
*/
StrDecimalLiteral = /[+-]?(Infinity|(?:(?:[0-9]+(?:\.[0-9]*)?)|(?:\.[0-9]*))(?:[eE][+-]?[0-9]+)?)/
BinaryIntegerLiteral= /0[Bb][01]+/
OctalIntegerLiteral = /0[Oo][0-7]+/
HexIntegerLiteral = /0[Xx][0-9A-Fa-f]+/

/*
StrDecimalLiteral::
    StrUnsignedDecimalLiteral
    + StrUnsignedDecimalLiteral
    - StrUnsignedDecimalLiteral
*/

/*
StrUnsignedDecimalLiteral::
    Infinity
    DecimalDigits . DecimalDigits<opt> ExponentPart<opt>
    . DecimalDigits ExponentPart<opt>
    DecimalDigits ExponentPart<opt>
*/
StrUnsignedDecimalLiteral = /Infinity|(?:(?:[0-9]+(?:\.[0-9]*)?)|(?:\.[0-9]*))(?:[eE][+-]?[0-9]+)?/
/*
ExponentPart ::
    ExponentIndicator SignedInteger
ExponentIndicator :: one of
    e E
SignedInteger ::
    DecimalDigits
    + DecimalDigits
    - DecimalDigits
*/
ExponentPart = /[eE][+-]?[0-9]+/
ExponentIndicator = /[eE]/
SignedInteger = /[+-]?[0-9]+/
/*
DecimalDigits::
    DecimalDigit
    DecimalDigits DecimalDigit
*/
DecimalDigits = /[0-9]+/
/*
DecimalDigit :: one of
0 1 2 3 4 5 6 7 8 9
*/
DecimalDigit = /[0-9]/


function convertStringToNumber(string, x){
    if(arguments.length < 2){
        x = 10;
    }
    var chars = string.split('');
    var number = 0;
    // 带e的自己写
    var i = 0;
    while(i < chars.length && chars[i] != '.'){
        number *= x;
        number += chars[i].codePointAt(0) - '0'.codePointAt(0);
        i++;
    }
    if(chars[i] == '.'){
        i ++;
    }
    var fraction = 1;
    while(i < chars.length && chars[i] != '.'){
        fraction /= x;
        number += (chars[i].codePointAt(0) - '0'.codePointAt(0)) * fraction;
        i ++;
    }
    return number;
}
convertStringToNumber('10.123');


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

//StringNumericLiteral=/[\s\n\r\u2028\u2029]+/
StrWhiteSpace = /[\s\n\r\u2028\u2029]+/
/*
StrNumericLiteral::
    StrDecimalLiteral
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral
*/

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
StrUnsignedDecimalLiteral = /[Infinity|[0-9]+\.[0-9]*([eE][+-]?[0-9]+)]/
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


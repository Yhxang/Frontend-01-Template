// 最终字符串正则表达式：（测试未通过）
// SingleStringCharactors是单引号，DoubleStringCharactors是双引号，二者的合集就是StringLiteral
const StringLiteralReg = /(\"([^\"\\\r\n\u2028\u2029]|[\u2028\u2029]|[^(([\'\"\\bfnrtv]|[^\'\"\\bfnrtv0-9xu\r\n\u2028\u2029])|0|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})]|\r\n\u2028\u2029]|\r\n)*\")|(\'([^\"\\\r\n\u2028\u2029]|[\u2028\u2029]|[^(([\'\"\\bfnrtv]|[^\'\"\\bfnrtv0-9xu\r\n\u2028\u2029])|0|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})]|\r\n\u2028\u2029]|\r\n)*\')/


/*========================================================*/
/*=====================以下是推导过程======================*/
/*========================================================*/
/*========================================================*/


/*
首先查阅ECMA262文档得到StringLiteral可能的形式：
    " DoubleStringCharactors "
    ' SingleStringCharactors '
*/
const DoubleStringCharactors = /\"([^\"\\\r\n\u2028\u2029]|[\u2028\u2029]|[^(([\'\"\\bfnrtv]|[^\'\"\\bfnrtv0-9xu\r\n\u2028\u2029])|0|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})]|\r\n\u2028\u2029]|\r\n)*\"/
const SingleStringCharactors = /\'([^\"\\\r\n\u2028\u2029]|[\u2028\u2029]|[^(([\'\"\\bfnrtv]|[^\'\"\\bfnrtv0-9xu\r\n\u2028\u2029])|0|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})]|\r\n\u2028\u2029]|\r\n)*\'/
/*========================================================*/

/* 
DoubleStringCharactors可能的形式：
    DoubleStringCharactor DoubleStringCharactors

DoubleStringCharactor可能的形式：
    SourceCharacter but not one of " or \ or LineTerminator
    <LS>
    <PS>
    \ EscapeSequence
    LineContinuation
        \ LineTerinatorSequence
*/
const LineTerinatorSequence=/([\r\n\u2028\u2029]|\r\n)+/
const LineContinuation = /\\([\r\n\u2028\u2029]|\r\n)+/
const DoubleStringCharactor = /[^\"\\\r\n\u2028\u2029]|[\u2028\u2029]|[^(([\'\"\\bfnrtv]|[^\'\"\\bfnrtv0-9xu\r\n\u2028\u2029])|0|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})]|\r\n\u2028\u2029]|\r\n/

/*========================================================*/

/*
EscapeSequence:
    CharactorEscapeSequence
    0
    HexExcapeSequence
    UnicodeEscapeSequence
        u Hex4Digits
        u{ CodePoint }    //!!!!!!!????这个怎么处理，暂时忽略????!!!!!!!//


//???????????????????????????????????????????????????????????//

CodePoint:
    HexDigits but only if MV of HexDigits <= 0x10FFFF
    
//???????????????????????????????????????????????????????????//
*/
const HexExcapeSequence = /x[0-9a-fA-F]{2}/
const UnicodeEscapeSequence = /u[0-9a-fA-F]{4}/ 
const EscapeSequence = /([\'\"\\bfnrtv]|[^\'\"\\bfnrtv0-9xu\r\n\u2028\u2029])|0|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}/ 

/*========================================================*/

/*
CharactorEscapeSequence:
    SingleEscapeCharacter
    NonEscapeCharacer
        SourceCharacter but no one of EscapeCharacter or LineTerminator
*/
const LineTerminator= /[\r\n\u2028\u2029]/
const NonEscapeCharacer = /[^\'\"\\bfnrtv0-9xu\r\n\u2028\u2029]/
const CharactorEscapeSequence = /[\'\"\\bfnrtv]|[^\'\"\\bfnrtv0-9xu\r\n\u2028\u2029]/

/*========================================================*/

/*
EscapeCharacter:
    SingleEscapeCharacter
    DecimalDigit
    x
    u
*/
const DecimalDigit = /[0-9]/
const SingleEscapeCharacter = /[\'\"\\bfnrtv]/
const EscapeCharacter = /[\'\"\\bfnrtv0-9xu]/

/*========================================================*/


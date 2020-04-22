// 最终数字正则表达式：
const NumericLiteralReg = /((((0|[1-9][0-9]*)(\.[0-9]?)?)|(\.[0-9]))([eE][+-]?[0-9]+)?)|(0[bB][01]+)|(0[oO][0-7]+)|(0[xX][0-9a-fA-F]+)/


/*========================================================*/
/*=====================以下是推导过程======================*/
/*========================================================*/


/*
首先查阅ECMA262文档得到NumericLiteral可能的形式：
    DecimalLiteral
    BinaryIntegerLiteral
    OctalIntegerLiteral
    HexIntegerLiteral
*/

/*========================================================*/

/* 
十进制DecimalLiteral可能的形式：
    DecimalIntegerLiteral . DecimalDigits ExponentPart
    . DecimalDigits ExponentPart
    DecimalIntegerLiteral ExponentPart
*/
const DecimalIntegerLiteral =/(0|[1-9][0-9]*)/
const DecimalDigits = /[0-9]+/
const ExponentPart = /[eE][+-]?[0-9]+/ //包含DecimalIntegerReg
const DecimalLiteral = /(((0|[1-9][0-9]*)(\.[0-9]?)?)|(\.[0-9]))([eE][+-]?[0-9]+)?/

/*========================================================*/

/* 
二进制BinaryIntegerLiteral可能的形式：
    0b BinaryDigit
    0B BinaryDigit
*/
const BinaryDigit = /[01]+/
const BinaryIntegerLiteral = /0[bB][01]+/

/*========================================================*/

/* 
八进制OctalIntegerLiteral可能的形式：
    0o OctalDigits
    0O OctalDigits
*/
const OctalDigits = /[0-7]+/
const OctalIntegerLiteral = /0[oO][0-7]+/

/*========================================================*/

/* 
十六进制HexIntegerLiteral可能的形式：
    0x HexDigit
    0X HexDigit
*/
const HexDigit = /[0-9a-fA-F]+/
const HexIntegerLiteral = /0[xX][0-9a-fA-F]+/

/*========================================================*/

/*
最后将DecimalLiteral、BinaryIntegerLiteral、OctalIntegerLiteral、HexIntegerLiteral的
正则表达式合并，得出Numericliteral的表达式:

/((((0|[1-9][0-9]*)(\.[0-9]?)?)|(\.[0-9]))([eE][+-]?[0-9]+)?)|(0[bB][01]+)|(0[oO][0-7]+)|(0[xX][0-9a-fA-F]+)/

*/
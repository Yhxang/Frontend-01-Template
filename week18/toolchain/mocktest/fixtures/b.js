var fs = require("fs");
var A =require("./a")
var C = require("./c")
module.exports = function (){
    console.log(fs.readFileSync("clowns.txt", "utf-8"))
    console.log(A)
    console.log(C)
}

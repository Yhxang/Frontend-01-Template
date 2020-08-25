const compiler = require("@vue/compiler-sfc");

let output = compiler.compileTemplate({ filename: 'example.vue', source: "<div>Hello world!</div>" });

console.log(output);
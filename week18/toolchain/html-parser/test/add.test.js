// "mocha" 不能用import，要测试的文件如果用了import，需要用babel转换再测试
// nyc 配置 @istanbuljs/nyc-config-babel 插件后可以nyc使用import 
// https://www.npmjs.com/package/@istanbuljs/nyc-config-babel
let assert = require("assert")
//let mod = require("../dist/add.js") // "dist"是经babel转换后的测试文件
import { add }  from "../src/add.js"
describe('add', function () {
    it('add(3, 4) should be 7', function () {
        assert.equal(add(3, 4), 7);
    });
});



//"ava" 可以直接用import，要测试的文件不需要babel转换

//import { add }  from "../src/add.js"
//import test from "ava"

// test('foo', t => {
//   if(add(3, 4)=== 7)
//     t.pass();
// });


import {parseHTML} from "../src/parser.js"
import { config } from "process";
let assert = require("assert")

it('parse a single element', () => {
    let doc = parseHTML("<div></div>");
    let div = doc.children[0];

    assert.equal(div.type, "element");
    assert.equal(div.tagName, "div");
    assert.equal(div.children.length, 0);
})

it('parse a single element with text', () => {
    let doc = parseHTML("<div>Hello world!</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.type, "text");
    assert.equal(text.content, "Hello world!");
})

it('tag mismatch', () => {
    try{
        let doc = parseHTML("<div></vid>")
    }catch(e){
        assert.equal(e.message, "Tag start end doesn't match!")
    }
})
    
it('text with <', () => {
    let doc = parseHTML("<div>a < b</div>");
    let text = doc.children[0].children[0];
    assert.equal(text.type, "text");
    assert.equal(text.content, "a < b");
})

it("tag with attribute", () => {
    let doc = parseHTML("<div  attr id=ele class= \"cls\" data='d'></div>");
    let div = doc.children[0];
    let count = 0;
    for(let attr of div.attributes){
        if(attr.name === "id"){
            count++;
            assert.equal(attr.value, "ele");
        }
        if(attr.name === "class"){
            count++;
            assert.equal(attr.value, "cls");
        }
        if(attr.name === "data"){
            count++;
            assert.equal(attr.value, "d");
        }
        if(attr.name === "attr"){
            count++;
            assert.equal(attr.value, "");
        }

    }
    assert.ok(count === 4);
    //assert.equal(div.a)
})

it("self closing tag", () => {
    let doc = parseHTML("<img/>");
    let div = doc.children[0];
    assert.equal(div.type, "element");
    assert.equal(div.tagName, "img");
})
it("self closing tag with unquoted attr value end with / ", () => {
    let doc = parseHTML("<img id=ele/>");
    let div = doc.children[0];
    assert.equal(div.type, "element");
    assert.equal(div.tagName, "img");
    for(let attr of div.attributes){
        if(attr.name === "id"){
            assert.equal(attr.value, "ele")
        }
    }
    assert.ok(true);
})
it("self closing tag with unquoted attr value end with >", () => {
    let doc = parseHTML("<div id=ele></div>");
    let div = doc.children[0];
    for(let attr of div.attributes){
        if(attr.name === "id"){
            assert.equal(attr.value, "ele")
        }
    }
    assert.ok(true);
})


it("script", () => {
    let scripts = `<div>abcd</div>
    <span>x</span>
    /script>
    <script
    <
    </
    </s
    </sc
    </scr
    </scri
    </scrip
    </script   `
    let doc = parseHTML(`<script>${scripts}</script>`);
    let text = doc.children[0].children[0];

    assert.equal(text.content, scripts);

})
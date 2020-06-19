# 每周总结可以写在这里

* 业务逻辑与控制逻辑分开


```javascript
async function* g(){
    yield 1;
    yield 2;
    yield 3;
}
for (let v of g()){
    console.log(v)
}
```


```javascript
async function* g(){
    let i = 0;
    while(true){
        await sleep(1000);
        yield i++;
    }
}
for await (let v of g()){
    console.log(v)
}
```
await 与 then 在运行时都是Promise，语法结构上await优于then。

**答疑：**
* 双11服务端3分钟提前量，客户端和服务端会校验下时间，用户实在想改也没法防。

> 写代码时，不会有什么api能瞬间帮你解决问题，这些只能帮我们解决一点点问题，最后方案应该是我们把这些api组合起来形成的方案。实际项目中，把Vue落地比Vue要解决的问题要麻烦的多，我们干的活儿可能比尤大干的活儿麻烦。要在已有的基础上，组合形成方案
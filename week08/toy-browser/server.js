const http = require("http");

// TODO：用express搭一个漂亮的server
const server = http.createServer((req,res) => {
    console.log("request received");
    console.log(req.headers);
    res.setHeader('Content-Type','text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, {'Content-Type' : 'text/html'}); 
    // 如果没这句Response就会没有Transfer-Encoding：chunked
    // 但如果text/html改为text/plain，后面用浏览器打开时看到的就是文字，而不是html页面
//     res.end(
// `<html maaa=a >
// <head>
//     <style>
// body div #myid{
//     width:100px;
//     background-color: #ff5000;
// }
// body div img{
//     width:30px;
//     background-color: #ff1111;
// }
//     </style>
// </head>
// <body>
//     <div>
//         <img id="myid"/>
//         <img />
//     </div>
// </body>
// </html>`);
    res.end(
`<html maaa=a >
<head>
    <style>
#container{
    width:500px;
    height:300px;
    display:flex;
    background-color:rgb(255,255,255)
}
#container #myid{
    width:200px;
    height:100px;
    background-color:rgb(255,0,0);
}
#container .c1{
    flex:1;
    background-color:rgb(0,255,0);
}
#myid2.c2{
    flex: 1;
    width: 100px;
    height: 100px;
    background-color:rgb(0,0,255)
}
.c4{
    flex:1;
    width: 50px;
    height: 50px;
    background-color:rgb(255,0,0)
}
    </style>
</head>
<body>
    <div id="container">
        <div id="myid"></div>
        <div class="c1"></div>
        <div id="myid2" class="c2"></div>
        <div class="c3 c4"></div>
    </div>
</body>
</html>`);
})

server.listen(8080);


/*
var xhr = new XMLHttpRequest;
xhr.open("get", "http://127.0.0.1:8080", true);
xhr.send(null);

xhr.responseText  //output: "ok"
*/
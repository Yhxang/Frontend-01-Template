# 发布工具

### 1. 在服务端搭建server  
最终目的是将文件发布到此server，并可以访问已发布的文件。可以使用`express-generator`快捷搭建。

### 2. 在服务端搭建publish-server 
该publish-server的作用是接收客户端的含有文件流请求，并将文件流储存到server的文件目录。  
```javascript
const http = require('http');
const fs = require('fs');
const unzip = require('unzipper'); // 解压缩库
// 创建服务器
const server = http.createServer((req, res) => { 
    // 解压缩到../server/public下
    let writeStream = unzip.Extract({path: "../server/public"}); 
    req.pipe(writeStream); //将request请求中的文件流直接管道接到writestream
    req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('okay')
    })
    
})
server.listen(8081);
```

### 3. 在客户端编写一个命令行的publish-tool 
作用是通过HTTP去访问publish-server，让publish-server通过Stream将publish-tool的内容给server添加文件。

```javascript
const http = require('http');
const fs = require('fs');
let archiver = require("archiver"); // 打压缩包 的库

let packname = "./package"; // 要打包上传的文件夹路径

const options = {
    host: 'localhost',
    port: 8081,
    path: '/?filename=' + "package.zip",
    method: 'POST',
    headers: {
        'Content-Type': 'application/octet-stream',
        //'Content-Length': 0 //stat.size //Buffer.byteLength(postData)
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});
req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

var archive = archiver('zip', { // 打包
    zlib: {level : 9}
})
archive.directory(packname, false);

archive.finalize();
archive.pipe(req); // 直接管道输送到request
archive.on('end', () => {
    console.log('end')
})
```
现在通过server的地址端口便可访问到已成功发布的文件。
const http = require('http');
//const querystring = require("querystring");
const fs = require('fs');
let archiver = require("archiver");

let packname = "./package";

let filename = "./desktop.png";

//fs.stat(filename, (err, stat) => {

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
        /*res.setEncoding('utf8');
        res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
        });
        res.on('end', () => {
        console.log('No more data in response.');
        });*/
    });
        
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });

    // 打包
    var archive = archiver('zip', {
        zlib: {level : 9}
    })
    archive.directory(packname, false);
    
    archive.finalize();
    archive.pipe(req); // 直接管道输送到request
    archive.on('end', () => {
        console.log('end')
    })
    
    // Write data to request body
    /*
    let readStream = fs.createReadStream('./desktop.png');
    readStream.pipe(req);
    readStream.on("end", () => {
        req.end();
        console.log('req end')
    })
    */
    
    //req.write(postData);
    //req.end();
//})
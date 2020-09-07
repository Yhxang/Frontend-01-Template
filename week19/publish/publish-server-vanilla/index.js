const http = require('http');
const fs = require('fs');
const unzip = require('unzipper');

const server = http.createServer((req, res) => {
    /*
    console.log(req);
    let matched = req.url.match(/filename=([^\&]+)/);
    let filename = matched && matched[1];
    console.log(filename);
    if(!filename)
        return;
    let writeStream = fs.createWriteStream("../server/public/" + filename);
    */
    let writeStream = unzip.Extract({path: "../server/public"});
    req.pipe(writeStream);
    req.on('end', () => {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('okay')
    })
    
})

server.listen(8081);
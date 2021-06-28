const http = require('http');
const fs = require('fs');

const server = http.createServer(handleServer);

function handleServer(req,res){
    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3000)
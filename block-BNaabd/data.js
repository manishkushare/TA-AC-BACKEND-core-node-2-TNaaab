const http = require('http');
const querystring = require('querystring');
const server = http.createServer(handleServer);
function handleServer(req,res){
    let store = "";
    let dataFormat = req.headers['content-type'];
    console.log(dataFormat);
    req.on('data',(chunk) => {
        store+= chunk;
    })
    req.on('end',()=> {
        if(req.method === "POST" && req.url === "/json"){
            res.setHeader('Contnet-Type','application/json');
            let parsedData = JSON.parse(store);
            res.end(JSON.stringify(parsedData));
        }
        else if(req.method === "POST" && req.url === "/form"){
            res.setHeader('Contnet-Type','application/json');
            let parsedData = querystring.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}
server.listen(7000);
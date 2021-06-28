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
        if(dataFormat === "application/json"){
            let parsedData = JSON.parse(store);
            res.end(JSON.stringify(parsedData));
        }
        else if(dataFormat === "application/x-www-form-urlencoded" ){
            let parsedData = querystring.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}
server.listen(7000);
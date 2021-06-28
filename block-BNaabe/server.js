console.log(__filename);

const path = require('path');
console.log(path.join(__dirname,"app.js"));
console.log(path.relative("Server.js","index.html"));
console.log(path.join(__dirname,"index.html"));

const http = require('http');
const querystring = require('querystring');

const server = http.createServer(handleServer)
function handleServer(req,res){
    let store = "";
    req.on('data',(chunk) => {
        store+= chunk;
    });
    req.on('end',()=>{
        if(req.method === "POST" && req.url === "/"){
            res.writeHead(201,{'Content-Type':'aaplication/json'});
            res.end(store);
        }
    })
}
server.listen(3300);

const server1 = http.createServer(handleServer1)
function handleServer1(req,res){
    let store = "";
    req.on('data',(chunk) => {
        store+= chunk;
    });
    req.on('end',()=>{
        if(req.method === "POST" && req.url === "/"){
            res.writeHead(201,{'Content-Type':'aaplication/json'});
            let parsedData = JSON.parse(store)
            res.end(JSON.stringify(parsedData.captain));
        }
    })
}
server1.listen(3330);

const server3 = http.createServer(handleServer3);
function handleServer3(req,res){
    let dataFormat = req.headers['contnet-type'];
    console.log(dataFormat);
    let store = "";
    req.on('data',(chunk) => {
        store+=chunk;
    });
    req.on('end',()=>{
        if(req.method === "POST" && req.url === "/json"){
            res.setHeader("Contnet-Type","application/json");
            res.end(store);
        }
        else if(req.method === "POST" && req.url === "/form"){
            res.setHeader("Contnet-Type","application/json");
            let parsedData = querystring.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}
server3.listen(9000);


const server4 = http.createServer(handleServer4);
function handleServer4(req,res){
    let store = "";
    req.on('data',(chunk) => {
        store += chunk;
    });
    req.on('end',()=> {
        let parsedData = JSON.parse(store);
        res.setHeader("Contnet-Type","text/html");
        Object.keys(parsedData).forEach((key,index) => {
            res.write(`<h${index+1}>${key} : ${parsedData[key]}<h${index+1}>`)
        });
        res.end();
    })
}
server4.listen(1111);

const server5 = http.createServer(handleServer5);
function handleServer5(req,res){
    let store = "";
    req.on('data',(chunk) => {
        store += chunk;
    });
    req.on('end',()=> {
        let parsedData = querystring.parse(store);
        res.setHeader("Contnet-Type","text/html");
        Object.keys(parsedData).forEach((key,index) => {
            if(key === "email"){
                res.write(`<h${index+1}>${key} : ${parsedData[key]}<h${index+1}>`)    
            }
            
        });
        res.end();
    })
}
server5.listen(2222);
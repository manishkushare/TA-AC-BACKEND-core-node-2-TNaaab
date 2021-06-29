const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const server1 = http.createServer(handleServer1);
// let form = document.querySelector('form');
function handleServer1(req,res){
    let store = "";
    req.on('data', (chunk) => {
        store += chunk;
    })
    
    req.on('end',()=> {
        if(req.method === "GET" && req.url === "/form"){
            res.setHeader('Contnet-Type','text/html')
            fs.createReadStream("./form.html").pipe(res);
        }
        if(req.method === "POST" && req.url === "/form"){
            console.log(store);
            let parsedData = querystring.parse(store);
            console.log(parsedData);
            res.setHeader('Contnet-Type','text/html')
            Object.keys(parsedData).forEach((key,index) => {
                res.write(`<h${index+1}>${key} : ${parsedData[key]}</h${index+1}>`)
            })
            res.end();
        }    
    })
    

}
server1.listen(5678);

// form.addEventListener('submit',hadnleForm);
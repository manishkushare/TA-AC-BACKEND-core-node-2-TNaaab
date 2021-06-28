const http = require('http');

const server = http.createServer(handleServer);

function handleServer(req,res){
    let store = "";
    req.on('data',(chunck) => {
        store+= chunck;
    })
    req.on('end', ()=> {
        console.log(store);
        res.write(store);
        res.end();
    })
}

server.listen(3456);

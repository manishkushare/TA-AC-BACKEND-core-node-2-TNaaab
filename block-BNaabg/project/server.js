const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const userDir = path.join(__dirname,"/users/");
console.log(userDir, typeof userDir);
const server = http.createServer(handleServer);

function handleServer(req,res){
    let store = "";
    let parsedURL = url.parse(req.url,true);
    let pathName = parsedURL.pathname;
    // console.log(pathName, " :path name");
    req.on('data',(chunk) => {
        store+=chunk;
    });
    req.on('end',()=>{
        if(req.method === "POST" && pathName === "/users"){
            // console.log(store, typeof store);
            let parsedData = JSON.parse(store);
            // console.log(parsedData ,"paese data");
            let username = parsedData.username;
            fs.open(userDir + username + ".json","wx",(err,fd) => {
                fs.writeFile(fd,store,(err)=>{
                    console.log(store);
                    if(err){
                        console.log(err, " :err");
                    }
                    else{
                        fs.close(fd,(err)=> {
                            if(!err){
                                res.end(`${username} succesfully created`);
                            }
                        })
                    }
                })
            })


        }
        else if(req.method === "GET" && pathName === "/users"){
            console.log(parsedURL);
            res.setHeader('Content-Type', 'application/json')
            fs.createReadStream(__dirname + pathName + "/" +parsedURL.query.username + ".json").pipe(res);
        }
        else if(req.method === "DELETE" && pathName === "/users"){
            let username = parsedURL.query.username;
            fs.unlink(__dirname+ pathName+ "/" + parsedURL.query.username+ ".json",()=> {
                console.log("delete");
            });
        }
        else if(req.method === "PUT" &&  pathName === "/users"){
            let username = parsedURL.query.username;
            fs.open(userDir+ username+".json","r+",(err,fd)=> {
                if(err){
                    console.log(err);
                }
                else{
                    fs.ftruncate(fd,(err)=>{
                        if(err) console.log(err);
                        fs.writeFile(fd,store,(err)=>{
                            if(err){
                                console.log(err);
                            }
                            else{
                                fs.close(fd,(err)=>{
                                    if(!err){
                                        res.end(`${username} is updated`);
                                    }
                                })
                            }
                        })
                    })
                }
            })
        }

        else {
            res.writeHead(404,{'Content-Type':'text/plain'});
            res.end("Something went wrong");
        }
    })
}

server.listen(4455,()=>{console.log("server is listening");});
var fs  = require("fs")
var http  = require("http")


//Escribí acá tu servidor

http.createServer(function(req,res){
    if(req.url==="/"){
        res.writeHead(200, { 'Content-Type':'text/plain' })
        res.end("casa");                   
    }else{
        fs.readFile(`./images${req.url}`,(err,img)=>{
            if(err){
            res.writeHead(404, { 'Content-Type':'text/plain' })
            res.end(`Error: req.url=${req.url} dosent exist`); 
            }else{
                res.writeHead(200, { 'Content-Type':'image/jpg' })
                res.end(img); 
            }
        })
    }
}).listen( 1337, '127.0.0.1' )

 
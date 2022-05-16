//const bodyParser = require("body-parser");
const express = require("express");

const STATUS_USER_ERROR = 422;
const error={error: "No se recibieron los parámetros necesarios para crear el Post"}
// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(express.json());

// TODO: your code to handle requests
/*
POST /posts
POST /posts/author/:author
Get=>/posts
Get=>/posts/author/:author
GET=>/posts/:author/:title
PUT=>/posts
DELETE /posts
DELETE /author
*/
server.post("/posts", function(req, res){

    var data=req.body
    var random=-1
    if(!data.author||!data.title||!data.contents) res.status(STATUS_USER_ERROR).json(error)
    else {
        while(random===-1){
            random=Math.floor(Math.random(100)*100)
            for(var i=0;i<posts.length;i++){
                if(posts[i].id===random)random=-1
            }
        }
        data.id=random
        posts.push(data)
        res.status(200).send(data)
    }
})

server.post("/posts/author/:author", function(req, res){

    var data=req.body
    var author=req.params.author
    var random=-1
    if(!author||!data.title||!data.contents) res.status(STATUS_USER_ERROR).json(error)
    else {
        while(random===-1){
            random=Math.floor(Math.random(100)*100)
            for(var i=0;i<posts.length;i++){
                if(posts[i].id===random)random=-1
            }
        }
        data.id=random
        posts.push({author,...data})
        res.send({author,...data})
    }
})

server.get("/posts", function(req, res){
    let data=req.query
    let arraux=[]
    if(data.term){
        posts.forEach(post=>{
            if(post.title.includes(data.term)||post.contents.includes(data.term))arraux.push(post)
        })
        res.send(arraux)
    }else res.send(posts)
})

server.get("/posts/:author", function(req, res){
    let author=req.params.author
    let arraux=[]
    posts.forEach(post=>{
        if(post.author===author)arraux.push(post)
    })
    if(arraux.length>0)res.send(arraux)
    else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post del autor indicado"})
})

server.get("/posts/:author/:title", function(req, res){
    let {author,title}=req.params
    let arraux=[]
    posts.forEach(post=>{
        if(post.author===author&&post.title===title)arraux.push(post)
    })
    if(arraux.length>0)res.send(arraux)
    else res.status(STATUS_USER_ERROR).json({error: "No existe ningun post con dicho titulo y autor indicado"})
})

server.put("/posts", function(req, res){
    var data=req.body
    var id=-1
    if(!data.id||!data.title||!data.contents)res.status(STATUS_USER_ERROR).json({error: "No se recibieron los parámetros necesarios para modificar el Post"})
    else{
        posts.forEach((post,i)=> {
            if(post.id==data.id){
                post.title=data.title
                post.contents=data.contents
                id=i
            }
        });
        if(id==-1)res.status(STATUS_USER_ERROR).json({error: "No se encontro el post con esa id"})
        else res.json(posts[id])
    }
})

server.delete("/posts", function(req, res){
    var {id}=req.body
    var aux=posts.find(e=>e.id===parseInt(id))
    if(aux){
        posts=posts.filter(p=>p!==aux)
        res.send({success:true})
    }else res.status(STATUS_USER_ERROR).json({error: "No existe el id indicado"})
})

server.delete("/author", function(req, res){
    var author=req.body.author
    
    if(!author)res.status(STATUS_USER_ERROR).json({error: "No hay autor"})
    else if(posts.find(e=>e.author==author)===undefined) res.status(STATUS_USER_ERROR).json({error: "No existe el autor indicado"})
    else {
        posts=posts.filter(e=>e.author==author)
        res.send({success:true})
    }
})


module.exports = { posts, server };

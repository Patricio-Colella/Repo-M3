const fs =require ("fs")
const request=require("request")

function ls(done){
fs.readdir('.', function(err, files) {
    var donete="";
    if (err) throw err;
    files.forEach(function(file) {
      donete=donete+file.toString() + "\n";
    })
    done(donete)
  });
}

function echo(done,str){
    var donete=""
    if(Array.isArray(str)){ 
        for(var i=0;i<str.length;i++){
        donete=donete+str[i]+" "  
        }
    }else{ donete=str;}
    done(donete) 
}

function date(done){
    done(Date())
}

function cat(done,str){
    fs.readFile(str[0],"utf-8",function(err, file) {
        if (err) throw err;
        done(file)
    })
}

function head(done,str) {
    fs.readFile(str[0], "utf-8", (err, data) => {
      if (err) throw err
      const lines = data.split("\n")
      done(lines.slice(0,Math.floor(lines.length/2)).join("\n"))
    })
}

function tail(done,str) {
    fs.readFile(str[0], "utf-8", (err, data) => {
      if (err) throw err
      const lines = data.split("\n")
      done(lines.slice(Math.floor(lines.length/2),lines.length).join("\n"))
    })
}

function pwd(done){
    done(process.cwd())
}

function curl(done,str) {
    request(str, function (error, response, body) {
      if(error) throw error
      done(body)
    });
}
//extras :D
function sort(done,str) {
    fs.readFile(str[0], "utf-8", (err, data) => {
      if (err) throw err
      const lines = data.split("\n")
      var nums=[];
      var sorted=[];
      lines.forEach(element => {
        for(let i=0;i<element.length;i++){
            nums.push(element[i].charCodeAt())
        }
        nums.sort()
        console.log(nums)
        for(let i=0;i<nums.length;i++){
            sorted.push(String.fromCharCode(nums[i]))
        }
        element=sorted
        nums=[]
        sorted=[]
        done(element)
      });
    })
}

module.exports = {
    date,
    pwd,
    ls,
    echo,
    cat,
    head,
    tail,
    curl,
    sort
}

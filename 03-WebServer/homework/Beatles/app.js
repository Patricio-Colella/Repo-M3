var http = require('http');
var fs   = require('fs');

var beatles=[{
  name: "John Lennon",
  birthdate: "09/10/1940",
  profilePic:"https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg"
},
{
  name: "Paul McCartney",
  birthdate: "18/06/1942",
  profilePic:"http://gazettereview.com/wp-content/uploads/2016/06/paul-mccartney.jpg"
},
{
  name: "George Harrison",
  birthdate: "25/02/1946",
  profilePic:"https://canaldosbeatles.files.wordpress.com/2012/02/george-george-harrison-8321345-438-600.jpg"
},
{
  name: "Richard Starkey",
  birthdate: "07/08/1940",
  profilePic:"http://cp91279.biography.com/BIO_Bio-Shorts_0_Ringo-Starr_SF_HD_768x432-16x9.jpg"
}
]

http.createServer(function(req,res){
  url=req.url.toLowerCase()
  if(req.url==="/"){
    res.writeHead(200, { 'Content-Type':'text/html' })
	  var html = fs.readFileSync(__dirname +'/index.html');
  	res.end(html);
  }
  
  if(url==="/john%20lennon"||url==="/paul%20mccartney"||url==="/george%20harrison"||url==="/richard%20starkey"){
    res.writeHead(200, { 'Content-Type':'text/html' })
	  var html = fs.readFileSync(__dirname +'/beatle.html',"utf-8");
     beatles.forEach(beatle => {
        var aux=beatle.name
        aux=aux.toLowerCase()
        aux=aux.replace(" ","%20")
        aux="/"+aux
         if(url===aux){
           html=html.replace(`{name}`,beatle.name)
           html=html.replace("{fecha}",beatle.birthdate)
           html=html.replace("{img}",beatle.profilePic)
         }       
     });
     res.end(html);
  }

  if(req.url==="/api"){
    res.writeHead(200, { 'Content-Type':'application/json' })
	  res.end( JSON.stringify(beatles) )                
  }

  if(url==="/api/jhon%20lennon"||url==="/api/paul%20mccartney"||url==="/api/george%20harrison"||url==="/api/richard%20starkey"){
    res.writeHead(200, { 'Content-Type':'application/json' })
    var response;
    beatles.forEach(beatle => {
      var aux=beatle.name
      aux=aux.toLowerCase()
       aux=aux.replace(" ","%20")
       aux="/api/"+aux
       if(aux===url)
	     response= JSON.stringify(beatle) 
     });
     res.end(response)
  }

  else{
        res.writeHead(404, { 'Content-Type':'text/plain' })
        res.end(); 
  }

}).listen( 1337, '127.0.0.1' )


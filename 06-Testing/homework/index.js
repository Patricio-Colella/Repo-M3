const express = require('express');
const app = express();

app.use(express.json()); // for parsing application/json

app.get('/', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.get('/test', (req, res) => {
  res.send({
    message: 'hola',
  });
});

app.post('/sum', (req, res) => {
  res.send({
    result: req.body.a+req.body.b
  });
});

app.post('/product', (req, res) => {
  res.send({
    result: req.body.a * req.body.b,
  });
});

app.post('/sumArray', (req, res) => {
  var arr=req.body.array
  var n=req.body.num
  var si=false
  for(var i=0;i<arr.length;i++){
    for(var x=i+1;x<arr.length;x++){
      if(arr[i]+arr[x]===n)si=true
    }
  }
  res.send({result:si})
});

app.post('/numstring', (req, res) => {
  var l=req.body.string
  if(typeof l==="number"||l.length===0)res.status(400).send()
  else res.status(200).send({ result:l.length, });
});

app.post('/pluck', (req, res) => {
  var {obj,propiedad}=req.body
  
  if(typeof obj!=="object"||propiedad.length===0)res.status(400).send()
  else res.status(200).send({ array:[obj[propiedad]] });
});

module.exports = app; // Exportamos app para que supertest session la pueda ejecutar

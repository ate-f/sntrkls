/* eslint-env es6, node*/
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

try{
  

var store = {};
app.use( bodyParser.json() );       

app.get('/t', function (req, res) {
  res.send('Geef aan hoeveel cadeautjes je hebt gekocht voor iedereen!');
})
app.use(express.static('public'))

app.listen(8080, function () {
  console.log('started sntrkls')
})

app.post('/presents', function (req, res) {  
  var data = req.body;
  store[data.id] = data.presents
  console.log("storing", data.presents);
  res.end('saved');
})

app.get('/presents/:id', function(req,res){
  res.send(store[req.params.id]);
})

app.delete('/presents/:id', function(req,res){
  
  delete store[req.params.id];
  
  res.send();
})

app.get('/showall',function(req,res){
  
  var keys = Object.keys(store)
  var presentsTotal = keys.reduce((total,cur)=>{
    if(!total){
      total = {};
    }
    var presents = store[cur];
    presents.forEach(present=> {
      var number = present.number;
      number = typeof number === "number"? number: parseInt(number);
      if(!total[present.name]){
        total[present.name] = number;  
      } else {
        total[present.name] += number;
      }    
      
    })    
    return total;
  },{});
  res.send(presentsTotal)
})

} catch(e){
  console.log(e);
}
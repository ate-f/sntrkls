/* eslint-env es6, node*/
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

var store = {};
app.use( bodyParser.json() );       

app.get('/t', function (req, res) {
  res.send('Geef aan wie je hebt getrokken voor sinterklaas!');
})
app.use(express.static('public'))

app.listen(3000, function () {
  console.log('started sntrkls')
})

app.post('/presents', function (req, res) {
  console.log(req.params);
  console.log(req.body);
  var data = req.body;
  store[data.id] = data.presents
  res.end('saved');
})

app.get('/presents/:id', function(req,res){
  console.log(req.params.id);  
  res.send(store[req.params.id]);
})

app.delete('/presents/:id', function(req,res){
  console.log(req.params);
  delete store[req.params.id];
  console.log(store)
  res.send();
})

app.get('/showall',function(req,res){
  console.log("showall");
  var keys = Object.keys(store)
  var presentsTotal = keys.reduce((total,cur)=>{
    if(!total){
      total = {};
    }
    var presents = store[cur];
    presents.forEach(present=> {
      console.log(present);
      if(!total[present.name]){
        total[present.name] = present.number;  
      } else {
        total[present.name] += present.number;
      }    
      
    })    
    return total;
  },{});
  res.send(presentsTotal)
})
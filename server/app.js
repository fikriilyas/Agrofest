const express = require('express')
const app = express()
const port = 3000
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Agrofest', {useNewUrlParser: true});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('succces')
});

var daftarPesertaSchema = new mongoose.Schema({
    nama: String,
    email: '',
    barcode: '',
    absenPagi: '',
    absenSiang: ''
  });
var daftarPeserta = mongoose.model('peserta', daftarPesertaSchema);

app.post('/absenPagi', function(req, res){
  daftarPeserta.findOne({barcode: req.body.data[0].data},'absenPagi',function(err,data){
    if(data.absenPagi == "Sudah"){
      daftarPeserta.findOneAndUpdate({barcode: req.body.data[0].data}, {$set:{absenPagi:"Double"}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        console.log('Double')
      });
    } else {
      daftarPeserta.findOneAndUpdate({barcode: req.body.data[0].data}, {$set:{absenPagi:"Sudah"}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
      });
    }
  })
    res.send(req.body)
})

app.post('/absenSiang', function(req, res){
  daftarPeserta.findOne({barcode: req.body.data[0].data},'absenSiang',function(err,data){
    if (data.absenSiang == "Sudah") {
      daftarPeserta.findOneAndUpdate({barcode: req.body.data[0].data}, {$set:{absenSiang:"Double"}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
        console.log('Double')
    })
    } else {
      daftarPeserta.findOneAndUpdate({barcode: req.body.data[0].data}, {$set:{absenSiang:"Sudah"}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
      });
    }
  })
    res.send(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
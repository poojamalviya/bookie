var express = require ('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require("mongodb");
var url = 'mongodb://localhost:27017/bookie';

app.get('/index', function(req, res){
    res.sendFile(__dirname + "/index.html")
});

app.get('/getdata', function (req, res, next) {
        mongo.connect(url, function (err, db) {
        db.collection('data').find().toArray(function (err, result) {
          if (err) {
                res.status('200').send("error");
            }
            else {
                res.set('Content-Type', 'application/json');
                res.status('200').send(result);
            }
        }); 
    });
});

app.post('/insert', function(req, res, next){
    var item = {
        book : req.body.book,
        author : req.body.author,
        owner : req.body.owner
    };
    mongo.connect(url, function(err, db){
     db.collection('data').inserOne(item, function(err, result){
         if (err) {
                res.status('200').send("error");
            }
            else {
                res.set('Content-Type', 'application/json');
                res.status('200').send(result);
            }
     console.log("Item is inserted");
     db.close();
     });
    });
});

app.post('/update', function(req, res, next){  
    var item = {
        book : req.body.book,
        author : req.body.author,
        owner : req.body.owner
    };
    var id = req.body.id;

    mongo.connect(url, function(err, db){
     db.collection('data').updateOne({"_id":objectId(id)}, {$set : item}, function(err, result){
         if (err) {
                res.status('200').send("error");
            }
            else {
                res.set('Content-Type', 'application/json');
                res.status('200').send(result);
            }
     console.log("Item is updated");
     db.close();
     });
    });
});


app.post('/delete', function(req, res, next){
    var id = req.body.id;
    mongo.connect(url, function(err, db){
     db.collection('data').deleteOne({"_id":objectId(id)}, function(err, result){
         if (err) {
                res.status('200').send("error");
            }
            else {
                res.set('Content-Type', 'application/json');
                res.status('200').send(result);
            }
     console.log("Item is deleted");
     db.close();
     });
    });
});


app.listen(8080, function(){
 console.log('litsening on 8080');
});
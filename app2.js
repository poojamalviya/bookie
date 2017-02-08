
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var url = "mongodb://localhost:27017/contactlist";

app.get('/', function (req, res, next) {
        mongo.connect(url, function (err, db) {
        db.collection('contactlist').find().toArray(function (err, result) {
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



 app.listen(3000);
 console.log("server listening on 3000");



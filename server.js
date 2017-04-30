var express = require('express')
var app = express()
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = process.env.MONGOLAB_URI;
var origUrl

app.get('/',function(req,res) {
    res.send('URL Shortener Microservice. Input a URL as a parameter and a shortened URL will be returned. Example: ')
})

app.get('/*', function (req,res) {
    var rawUrl = req.params[0]
    if (rawUrl.substr(0,4) == 'http') {
        if (rawUrl.slice(12).indexOf('.') >= 0) {
            origUrl = rawUrl
            getData(origUrl)
        }
    }
    else {
        res.send('Error: invalid URL')
    }
})

function getData(input) {
    MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } 
    var docs = db.collection('urls');
    var checkUrl = docs.find({'original url' : origUrl})
    
    // do some work here with the database.

    //Close connection
    db.close();
  }
});
}

app.listen(8080, function () {
})
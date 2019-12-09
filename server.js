const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;
const url = "mongodb://localhost:27017";

app.use('/', express.static('.'));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/all_appeals', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        let dbo = db.db("project-db");
        let result = dbo.collection("all_appeals").find().toArray().then(function (data) {
            res.send(data);
        });
        db.close();
    });
});

app.post('/all_appeals', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("project-db");
            dbo.collection("all_appeals").insert(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});


app.delete('/all_appeals', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("project-db");
            dbo.collection("all_appeals").remove(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.get('/anews', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        let dbo = db.db("project-db");
        let result = dbo.collection("anews").find().toArray().then(function (data) {
            res.send(data);
        });
        db.close();
    });
});

app.post('/anews', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("project-db");
            dbo.collection("anews").insert(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});


app.delete('/anews', function (req, res) {
    mongoClient.connect(url, function (err, db) {
        if (err) {
            throw err;
        }

        if (req.body) {
            let dbo = db.db("project-db");
            dbo.collection("news").remove(req.body, function(err, res) {
                if (err) throw err;
                db.close();
            });
        }
    });
    res.send();
});

app.listen(port, function () {
    console.log("Listening at port", port);
});
const mongodb = require('mongodb').MongoClient;
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();
const port = 7001;

// Connection string to local instance of MongoDB including database
const connectionStringURI = 'mongodb://127.0.0.1:27017/socialnetworkDB';

// Declare a variable to hold the connection 
var db;

mongodb.connect(
    connectionStringURI,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err, client) => {
        db = client.db();
        app.listen(port, () => {
            console.log(`Example app listening at http://localhost:${port}`)
        })
    }

)
app.use(routes)
app.use(express.json());
app.post('/create', (req, res) => {
    db.collection('socialNetwork').insertOne(
      { title: req.body.title, author: req.body.author },
      (err, results) => {
        if (err) throw err;
        res.json(results);
      }
    );
  });

  app.get('/read', (req, res) => {
    db.collection('socialNetwork')
      .find()
      .toArray((err, results) => {
        if (err) throw err;
        res.send(results);
      });
  });

  app.delete('/delete', (req, res) => {
    // Use deleteOne() to delete one object
    db.collection('socialNetwork').deleteOne(
      // This is the filter. We delete only the document that matches the _id provided in the request body,
      { _id: ObjectId(req.body.id) },
      (err) => {
        if (err) throw err;
        res.send("Document deleted");
      }
    );
  });


// app.use(require('./routes'));
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

mongoose.set('debug', true);
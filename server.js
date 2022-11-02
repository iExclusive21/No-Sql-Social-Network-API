const mongoose = require('mongoose');
const express = require('express');

const app = express();
const port = 7001;

// Connection string to local instance of MongoDB including database
const connectionStringURI = 'mongodb://127.0.0.1:27017/socialnetworkDB',

// Declare a variable to hold the connection 
let db;

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
app.use(express.json());

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URI ||  {
    
});

app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));
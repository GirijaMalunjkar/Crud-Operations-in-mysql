//import libraries
const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');

var app = express();
app.use(express.json());

//MiddleWares
app.use(cors());
app.use(bodyparser.json());

//Server Connection
const port = 8080;

app.listen(port, () => {
    console.log('Server Start At Port :' + port)
});

//testing server
app.get("/",(req,res) => {
    res.send("Test");
});
//api
const route = require('./route/route');

app.use('/api',route)



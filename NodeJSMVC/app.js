var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

app.get('/',function (req,res) {
   res.sendFile(path.join(__dirname,"index.html"));
});

app.get('/login',function (req,res) {
    fs.readFile('login.html',function (err ,data ) {
        res.write(data);
        res.end('mesaj bitti');
        console.log('loginController');
    })
});

app.listen(8000);
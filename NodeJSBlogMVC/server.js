require('./models/db');
const express = require('express');
const app = express();
const mongoose =  require("mongoose");
const Article = mongoose.model('Article');
const articleController = require("./controllers/articleController");

app.use(express.urlencoded({extended:false}));

app.set('view engine','ejs');


app.get("/" ,(req,res)=>{
    const articles = Article.find((err,docs)=>{
        if (!err) {
            res.render('articles/index' ,{ 
                articles : docs 
            });
            
        }
    });
    //console.log(Article.find());
    
});


app.listen(5000 ,()=>{
    console.log("Server 5000 de basladi...");
});
app.use("/articles" ,articleController);
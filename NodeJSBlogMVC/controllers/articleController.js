const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const Article = mongoose.model('Article');
router.get("/" ,(req,res)=>{
    res.send("articles")
});

router.get("/new" ,(req,res)=>{
    res.render('articles/new' , {article : new Article()})
});
router.post("/new" , (req,res)=>{
    insertRecord(req,res);
});

router.get('/:id', async(req,res)=>{
    const article = await Article.findById(req.params.id)
    if (article==null) {
        res.redirect("/");
    }
    res.render('articles/show',{article : article });
});

function insertRecord(req,res) {
    var article = new Article({ 
        title : req.body.title,
    description : req.body.description ,
    markdown : req.body.markdown
    });
    article.save((err,doc)=>{
        if (!err) {
            res.redirect(`/articles/${article._id}`);
        }
        else{
            console.log(err);
            res.render('articles/new' , {article : article});
        }
    });
  
}
router.get("/delete/:id",(req ,res)=>{
    Article.findByIdAndDelete(req.params.id ,(err,doc)=>{
        if (!err) {
            res.redirect("/");
        }
        else{
            console.log(err);
        }
    })
});
function updateRecord(req ,res) {
  Article.findOneAndUpdate({_id:req.params.id},req.body,{new:true},(err,doc)=>{
        if (!err) {
            console.log(req.params.id);
            res.redirect("/");
        }
        else{
            
            console.log(err);
            
        }
    });
}
router.get("/edit/:id",(req,res)=>{
   var article = Article.findById(req.params.id ,(err,doc)=>{
        if(!err){
            //console.log(doc);
            res.render("articles/edit" ,{
                article:doc
            });
        }
      
    })
});

router.post("/edit/:id" , (req,res)=>{
   
        updateRecord(req,res);
    
    
});

module.exports = router;
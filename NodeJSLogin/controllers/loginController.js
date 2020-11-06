const express = require("express");
const router = express.Router();
const users = require("../models/db");

router.get("/",(req,res)=>{
    res.render("login.ejs");
});
router.post("/" ,(req ,res)=>{
    loginControllerFunction(req,res);
    console.log(req.body);
});


function loginControllerFunction(req,res) {
   for (const user of users) {
       if (user.name == req.body.name && user.password == req.body.password) {
           res.render('index.ejs',{user:user.name})
           console.log("kullanıcı adı dogru")
       }
       else{
        res.render('index.ejs',{user:"kullanıcı adi bulunamadi..."})
        console.log("kullanici adi hatali...")
       }
   }
}


module.exports = router;
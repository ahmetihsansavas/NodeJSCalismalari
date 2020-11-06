const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const users = require("../models/db");

router.get("/",(req,res)=>{
    res.render("register.ejs");
});

router.post("/",async (req,res)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password ,10);
        users.push({
            id: Date.now().toString(),
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        });
        res.redirect("/login");
    } catch (error) {
        res.redirect("/register");
    }
    console.log(users);
});


module.exports = router;
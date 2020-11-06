const express = require("express");
const app = express();

const loginController = require("./controllers/loginController");
const registerController = require("./controllers/registerController");

app.set('view-engine','ejs');
app.use(express.urlencoded({ extended:false}));

app.get("/",(req,res)=>{
    res.render("index.ejs");
});


app.listen(4000,()=>{
    console.log("server 4000 portunda basladi...")
}
);

app.use("/login",loginController);
app.use("/register" ,registerController);
const express= require("express");
const wrapAsync = require("../utils/wrapAsync");
const router= express.Router();
const User= require("../models/user");
const passport=require("passport");

// SignUp
router.get("/signup" ,async (req, res)=>{
    // res.render("/user/user.ejs");
    res.render("user/user.ejs");
});

router.post("/signup", wrapAsync (async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser= new User ({
            email: email,
            username:username,
        });
        let regUser = await User.register(newUser, password);
        console.log(regUser);
        req.flash("success", "Welcome To StaySphere!!");
        res.redirect("/listings");
    } catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}));

// Login
router.get("/login" , (req,res)=>{
    res.render("user/login.ejs")
});

router.post('/login', 
  passport.authenticate("local", { failureRedirect: '/login',failureFlash:true }),
  async (req, res)=> {
    req.flash("success", "Welcome back to StaySphere")
    res.redirect('/listings');
  });

module.exports= router;
const express= require("express");
const wrapAsync = require("../utils/wrapAsync");
const router= express.Router();
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController= require("../controllers/user");

// SignUp
router.get("/signup" ,userController.signupForm);
router.post("/signup", wrapAsync (userController.signUp));

// Login
router.get("/login" ,userController.loginForm);
router.post('/login', saveRedirectUrl,
passport.authenticate("local", { failureRedirect: '/login',failureFlash:true }),userController.login);


// logout
router.get("/logout",userController.logout);

// privacy and terms
router.get("/privacy",(req,res)=>{
    res.render("user/privacy.ejs");
});
router.get("/terms",(req,res)=>{
    res.render("user/term.ejs");
});

module.exports= router;
const User= require("../models/user");

module.exports.signupForm=async (req, res)=>{
    res.render("user/user.ejs");
}

module.exports.signUp=async (req,res)=>{
    try{
        let {username,email,password}=req.body;
        let newUser= new User ({
            email: email,
            username:username,
        });
        let regUser = await User.register(newUser, password);
        console.log(regUser);
        req.login(regUser,(err)=>{
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome To StaySphere!!");
            res.redirect("/listings");
        });
    } catch(err){
        req.flash("error", err.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm= (req,res)=>{
    res.render("user/login.ejs")
}

module.exports.login=async (req, res)=> {
    req.flash("success", "Welcome back to StaySphere")
    let redirectUrl= res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout=(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You logged Out!");
        res.redirect("/listings");
    });
}
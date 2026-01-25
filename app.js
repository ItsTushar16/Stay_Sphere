if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}

const express= require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session=require("express-session");
const { MongoStore } = require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const listings=require("./routes/listing.js");
const reviews= require("./routes/review.js");
const user= require("./routes/user.js");

const port = process.env.PORT || 8080;

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect(process.env.ATLASDB_URL);
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


const store= new MongoStore({
    mongoUrl:process.env.ATLASDB_URL,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter:24*3600,
});

store.on("error",()=>{
    console.log("ERROR in MONGO SESSION STORE",err);
})

const sessionOption={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitailzed:true,
    cokkie:{
        expires:Date.now()+ 7*24*60*60*1000,
        maxAge:7*24*60*60*1000,
        httpOnly:true,
    }

}


app.use(session(sessionOption));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
    res.locals.success= req.flash('success');
    res.locals.error= req.flash("error");
    res.locals.currUser=req.user;
    next();
});


// Express Router
app.use("/",listings);
app.use("/listings/:id/reviews", reviews);
app.use("/",user);


// error handling
app.use((req, res, next) => {
    next(new ExpressError(404, "page not found!!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went Wrong!!"}=err;
    res.render("error.ejs",{message});
    
});


app.listen(port, () => {
    console.log(`server working on port:${port}`);
});

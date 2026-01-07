const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review= require("./models/review.js");
const path = require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema}= require("./schema.js");
const {reviewSchema} = require("./schema.js");

const listings=require("./routes/listing.js");
const reviews= require("./routes/review.js");



main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StaySphere');
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// Express Router
app.use("/",listings);
app.use("/listings/:id/reviews", reviews);


// error handling
app.use((req, res, next) => {
    next(new ExpressError(404, "page not found!!"));
});

app.use((err,req,res,next)=>{
    let {statusCode=500,message="Something went Wrong!!"}=err;
    res.render("error.ejs",{message});
    
});


app.listen(8080,()=>{
    console.log("server wrking on port:8080");
});
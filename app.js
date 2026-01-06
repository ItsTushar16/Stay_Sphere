const express= require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const Review= require("./models/review.js")
const path = require("path");
const methodOverride= require("method-override");
const ejsMate= require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema}= require("./schema.js");
const {reviewSchema} = require("./schema.js");

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

// Validating Listing Schema
const validatingListing= (req,res,next)=>{
    let {error}=listingSchema.validate(req.body);
        if(error){
            let errMsg= error.details.map((el)=>el.message).join(",")
            throw new ExpressError(400,errMsg);
        }
        else{
            next();
        }
}

// validating Review Schema
const validatingReview= (req,res,next)=>{
    let {error}=reviewSchema.validate(req.body);
        if(error){
            let errMsg= error.details.map((el)=>el.message).join(",")
            throw new ExpressError(400,errMsg);
        }
        else{
            next();
        }
};



// index route
app.get("/listings",wrapAsync(async (req,res)=>{
    const allListings=  await Listing.find({});
    res.render("listings/index.ejs", {allListings});

}));

app.get("/", (req,res)=>{
    res.send("server working");
});

// new listing

app.get("/listing/new",(req,res) => {
    res.render("listings/new.ejs");

});


// show route

app.get("/listing/:id" ,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});

}));

// create route

app.post("/listings" , validatingListing ,wrapAsync(async (req,res)=>{
        const newListing= new Listing(req.body.listing);
        await newListing.save();
        console.log("Added");
        res.redirect("/listings");
    })
);

// edit route

app.get("/listings/:id/edit",wrapAsync (async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}));

// Update route
app.put("/listings/:id", validatingListing , wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing")
    } 
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect('/listings');
}));
// delete route
app.delete("/listings/:id",wrapAsync (async(req,res)=>{
    let{id}= req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log("deleted listing");  
    res.redirect("/listings");
}));


// review route  -- Post
app.post("/listings/:id/reviews", validatingReview ,wrapAsync( async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview=  new Review(req.body.reviews);

    await newReview.save();

    listing.reviews.push(newReview);

    await listing.save();

    res.redirect(`/listing/${listing._id}`);
    

}));

// review delete route

app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async (req,res)=>{
    let{id, reviewId}= req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
}));

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


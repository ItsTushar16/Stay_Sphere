const express= require("express");
const router= express.Router();
const {listingSchema}= require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");



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

// index route
router.get("/listings",wrapAsync(async (req,res)=>{
    const allListings=  await Listing.find({});
    res.render("listings/index.ejs", {allListings});

}));

router.get("/", (req,res)=>{
    res.send("server working");
});

// new listing

router.get("/listing/new",(req,res) => {
    res.render("listings/new.ejs");

});


// show route

router.get("/listing/:id" ,wrapAsync(async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id).populate("reviews");
    res.render("listings/show.ejs",{listing});

}));

// create route

router.post("/listings" , validatingListing ,wrapAsync(async (req,res)=>{
        const newListing= new Listing(req.body.listing);
        await newListing.save();
        console.log("Added");
        res.redirect("/listings");
    })
);

// edit route

router.get("/listings/:id/edit",wrapAsync (async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});

}));

// Update route
router.put("/listings/:id", validatingListing , wrapAsync(async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing")
    } 
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect('/listings');
}));
// delete route
router.delete("/listings/:id",wrapAsync (async(req,res)=>{
    let{id}= req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log("deleted listing");  
    res.redirect("/listings");
}));

module.exports= router;
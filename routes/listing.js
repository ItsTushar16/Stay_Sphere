const express= require("express");
const router= express.Router();
const {listingSchema}= require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const{isLoggedIn,isOwner}=require("../middleware.js")
const listingController= require("../controllers/listing.js");


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
router.get("/listings",wrapAsync(listingController.index));

router.get("/", (req,res)=>{
    res.send("server working");
});

// new listing
router.get("/listing/new",isLoggedIn,listingController.newListingForm);

// show route
router.get("/listing/:id" ,wrapAsync(listingController.showListing));

// create route
router.post("/listings" , validatingListing ,isLoggedIn,wrapAsync(listingController.addNewListing));

// edit route
router.get("/listings/:id/edit",isLoggedIn,isOwner,wrapAsync (listingController.editForm));

// Update route
router.put("/listings/:id",isLoggedIn, isOwner,validatingListing , wrapAsync(listingController.updateListing));

// delete route
router.delete("/listings/:id",isLoggedIn,isOwner,wrapAsync (listingController.destroy));

module.exports= router;
const express= require("express");
const router= express.Router();
const {listingSchema,updatedListingSchema}= require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const Listing = require("../models/listing");
const{isLoggedIn,isOwner}=require("../middleware.js")
const listingController= require("../controllers/listing.js");
const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload = multer({storage});

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
//  Validating updated Listing Schema
const validatingUpdatedListing= (req,res,next)=>{
    let {error}=updatedListingSchema.validate(req.body);
        if(error){
            let errMsg= error.details.map((el)=>el.message).join(",")
            throw new ExpressError(400,errMsg);
        }
        else{
            next();
        }
}

// home route
app.get("/", (req, res) => {
  res.redirect("/listings");
});


// index route
router.get("/listings",wrapAsync(listingController.index));

// new listing
router.get("/listing/new",isLoggedIn,listingController.newListingForm);

// search
router.get('/listings/search',listingController.search);

// category wise listing
router.get("/listings/filter/:category", listingController.filterListing);

// create route -- add New Listing
router.post("/listings" , 
    isLoggedIn,
    upload.single("listing[image]"),
    validatingListing ,
    wrapAsync(listingController.addNewListing)
);
// edit route
router.get("/listings/:id/edit",isLoggedIn,isOwner,wrapAsync (listingController.editForm));

// Update route
router.put("/listings/:id",
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validatingUpdatedListing , 
    wrapAsync(listingController.updateListing)
);

// show route
router.get("/listing/:id" ,wrapAsync(listingController.showListing));

// delete route
router.delete("/listings/:id",isLoggedIn,isOwner,wrapAsync (listingController.destroy));

module.exports= router;
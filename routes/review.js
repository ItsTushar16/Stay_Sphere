const express= require("express");
const router= express.Router({mergeParams:true});
const Listing = require("../models/listing");
const Review= require("../models/review.js")
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");

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

// review route  -- Post
router.post("/", validatingReview ,wrapAsync( async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview=  new Review(req.body.reviews);

    await newReview.save();

    listing.reviews.push(newReview);

    await listing.save();

    res.redirect(`/listing/${listing._id}`);
    

}));

// review delete route

router.delete("/:reviewId", wrapAsync(async (req,res)=>{
    let{id, reviewId}= req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);

    res.redirect(`/listing/${id}`);
}));

module.exports= router;
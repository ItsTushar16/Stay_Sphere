const express= require("express");
const router= express.Router({mergeParams:true});
const Listing = require("../models/listing");
const Review= require("../models/review.js")
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const {isLoggedIn,isReviewAuthor}= require("../middleware.js");

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
router.post("/", isLoggedIn,validatingReview ,wrapAsync( async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview=  new Review(req.body.reviews);
    newReview.author=req.user._id;

    await newReview.save();

    listing.reviews.push(newReview);

    await listing.save();

    req.flash('success','Review Added!!!');
    res.redirect(`/listing/${listing._id}`);
    

}));

// review delete route

router.delete("/:reviewId",isLoggedIn,isReviewAuthor ,wrapAsync(async (req,res)=>{
    let{id, reviewId}= req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review Deleted!!!');
    res.redirect(`/listing/${id}`);
}));

module.exports= router;
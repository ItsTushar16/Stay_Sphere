const express= require("express");
const router= express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const {isLoggedIn,isReviewAuthor}= require("../middleware.js");
const reviewController=require("../controllers/review.js");

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
router.post("/", isLoggedIn,validatingReview ,wrapAsync(reviewController.addReview));

// review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor ,wrapAsync(reviewController.destroyReview));

module.exports= router;
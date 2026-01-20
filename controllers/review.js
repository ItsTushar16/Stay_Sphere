const Listing = require("../models/listing");
const Review= require("../models/review.js");

module.exports.addReview=async(req,res)=>{
    let listing= await Listing.findById(req.params.id);
    let newReview=  new Review(req.body.reviews);
    newReview.author=req.user._id;

    await newReview.save();

    listing.reviews.push(newReview);

    await listing.save();

    req.flash('success','Review Added!!!');
    res.redirect(`/listing/${listing._id}`);
}

module.exports.destroyReview=async (req,res)=>{
    let{id, reviewId}= req.params;

    await Listing.findByIdAndUpdate(id,{$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Review Deleted!!!');
    res.redirect(`/listing/${id}`);
}

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review");
const review = require("./review");
const { string, required } = require("joi");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename:String
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:"Review",
    }
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  category:{
    type:String,
    enum:["hostel","room","mountains", "castle","camping","villa","apartment","home","flat","farms","lake","desert","island","iconicCity"],
    required:true,
  }

});

listingSchema.post("findOneAndDelete", async (listing)=>{
  if(listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1696393800648-8281a3fc21d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1696393800648-8281a3fc21d7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  reviews:[
    {
      type: Schema.Types.ObjectId,
      ref:"Review",
    }
  ]
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

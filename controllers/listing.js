const Listing = require("../models/listing");

module.exports.index= async (req,res)=>{
    const allListings=  await Listing.find({});
    res.render("listings/index.ejs", {allListings});

}

module.exports.newListingForm=(req,res) => {
    res.render("listings/new.ejs");

}

module.exports.showListing=async (req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id)
    .populate({
        path:"reviews",
        populate:{
            path:"author"
        }
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});

}

// create listing -- add new listing
module.exports.addNewListing=async (req,res)=>{
        let url = req.file.path;
        let filename = req.file.filename;

        const newListing= new Listing(req.body.listing);
        newListing.owner=req.user._id;
        newListing.image={url,filename};
        await newListing.save();
        console.log("Added");
        req.flash('success','New Listing Created!!!');
        res.redirect("/listings");
}

module.exports.editForm=async(req,res)=>{
    let {id}=req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist");
        return res.redirect("/listings");
    }
    let category=listing.category;
    let originalImageUrl=listing.image.url;
    originalImageUrl= originalImageUrl.replace("/upload","/upload/h_300,w_300");
    res.render("listings/edit.ejs",{listing,originalImageUrl,category});

}

module.exports.updateListing=async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing")
    } 
    let{id}=req.params;
    let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing});

    if(typeof req.file!== "undefined"){
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        await listing.save();
    }
    req.flash('success',' Listing Updated!!!');
    res.redirect('/listings');
}

// category wise listing showing
module.exports.filterListing=async (req, res) => {
  const { category } = req.params;
  const allListings = await Listing.find({ category });
  if(allListings.length===0){
    req.flash("error","No Listing under this category");
    return res.redirect("/listings");
  }
  res.render("listings/index", { allListings, category });
}

// search
module.exports.search=async (req, res) => {
  const query = req.query.q; 

  if (!query) {
    return res.redirect('/listings'); 
  }

  try {
    const results = await Listing.find({
      $or: [
        { title: new RegExp(query, 'i') },
        { location: new RegExp(query, 'i') },
        { country: new RegExp(query, 'i') }
      ]
    });

    res.render('listings/index', { allListings: results, q: query });
  } catch (err) {
    console.log(err);
    res.redirect('/listings');
  }
}

module.exports.destroy=async(req,res)=>{
    let{id}= req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log("deleted listing");  
    req.flash('success',' Listing Deleted!!!');
    res.redirect("/listings");
}

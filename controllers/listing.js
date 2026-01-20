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

module.exports.addNewListing=async (req,res)=>{
        const newListing= new Listing(req.body.listing);
        newListing.owner=req.user._id;
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
    res.render("listings/edit.ejs",{listing});

}

module.exports.updateListing=async (req,res)=>{
    if(!req.body.listing){
        throw new ExpressError(400,"Send valid data for listing")
    } 
    let{id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    req.flash('success',' Listing Updated!!!');
    res.redirect('/listings');
}

module.exports.destroy=async(req,res)=>{
    let{id}= req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log("deleted listing");  
    req.flash('success',' Listing Deleted!!!');
    res.redirect("/listings");
}
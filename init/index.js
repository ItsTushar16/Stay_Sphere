const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main().then(()=>{
    console.log("connected to DB");
}).catch((err)=>{
    console.log(err);
});

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/StaySphere');
}

const initDB= async () =>{
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj,owner:"6963ef10710db43925c35aca"}))
    await Listing.insertMany(initData.data);
    console.log("data was initilised");

}

initDB();
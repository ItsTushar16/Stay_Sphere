
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose').default;



const userSchema = new Schema({
    email:{
        type:String,
        required: true,
    }
});

userSchema.plugin(passportLocalMongoose);
// it byDefault add username,pass, salting,hashing.No need to define username,passin schema

module.exports = mongoose.model("User", userSchema);
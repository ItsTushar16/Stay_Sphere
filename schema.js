const Joi = require('joi');

module.exports.listingSchema =Joi.object({
    listing: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().allow("",null),
        price:Joi.number().required().min(0),
        country:Joi.string().required(),
        location:Joi.string().required(),
        category: Joi.string()
            .valid("hostel","room","mountains", "castle","camping","villa","apartment","home","flat","farms","lake","desert","island","iconicCity")
            .required()
    }).required(),
});


// For validating updating schema
module.exports.updatedListingSchema =Joi.object({
    listing: Joi.object({
        title:Joi.string().required(),
        description:Joi.string().required(),
        image:Joi.string().allow("",null),
        price:Joi.number().required().min(0),
        country:Joi.string().required(),
        location:Joi.string().required(),
    }).required(),
});


// For Review Schema

module.exports.reviewSchema=Joi.object({
    reviews:Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
    }).required(),
});


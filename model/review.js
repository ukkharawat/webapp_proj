var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')

var review = mongoose.Schema({
    _id: Number,
    cosmetic_name : {type: String , ref: 'Cosmetic'},
    review: [{
        reviewer: {type: String , ref: 'User'},
        content: String,
        date: String,
        starPoint : {type: Number , min: 0 , max:5},
        like: {
            count: Number,
            who: [{type: String , ref: 'User'}]
        }
    }]
}, {_id: false})

review.plugin(autoIncrement, {inc_field: '_id'})
var Review = module.exports = mongoose.model('Review', review)

module.exports.getAllReview = function(cosmetic_name , callback){
    var query = {cosmetic_name : cosmetic_name}
    Review.findOne(query , callback)
}

module.exports.review = function(review , callback){
    review.save(callback)
}
var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')

var review = mongoose.Schema({
    _id: Number,
    cosmetic_name : {type: String , ref: 'Cosmetic'},
    review: [{
        reviewer: {type: String , ref: 'User'},
        content: String,
        date: Date,
        starPoint : {type: Number , min: 0 , max:5},
        like: {
            count: Number,
            who: [{type: String , ref: 'User'}]
        }
    }]
}, {_id: false})

review.plugin(autoIncrement, {inc_field: '_id'})
module.exports = mongoose.model('Review', review)
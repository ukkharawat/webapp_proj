var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')

var post = mongoose.Schema({
    _id: Number,
    poster: {type: String , ref: 'User'},
    cosmetic_name : {type: String , ref: 'Cosmetic'},
    date: Date,
    content: String, //header
    comments: [{
        user: {type: String , ref: 'User'}, // who comment
        comment: String, // comment what?
        date_comment: Date
    }],
    like: {
        count: Number,
        who: [{type: String , ref: 'User'}] // collect who like it
    }
}, {_id: false})

post.plugin(autoIncrement, {inc_field: '_id'})
module.exports = mongoose.model('Post', post)
var mongoose = require('mongoose')

var user = mongoose.Schema({
    poster: String,
    cosmetic_name : String,
    date: Date,
    content: String, //header
    comments: [{
        user: String, // who comment
        comment: String, // comment what?
        date_comment: Date
    }],
    like: {
        count: Number,
        who: [] // collect who like it
    },
    dislike: {
        count: Number,
        who: []
    }
})

module.exports = mongoose.model('Post', user)
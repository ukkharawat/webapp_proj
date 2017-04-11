var mongoose = require('mongoose')

var user = mongoose.Schema({
    poster: String,
    date: Date,
    content: String,
    comments: [{
        user: String,
        comment: String
    }],
    like: {
        count: Number,
        who: []
    },
    dislike: {
        count: Number,
        who: []
    }
})

module.exports = mongoose.model('Post', user)
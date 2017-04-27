var mongoose = require('mongoose')

var user = mongoose.Schema({
    username: { type: String, index: { unique: true }},
    password: String,
    authen: Number,
    wishlist: [{
        type: String , ref : "Cosmetic"
    }]
})

module.exports = mongoose.model('User', user)
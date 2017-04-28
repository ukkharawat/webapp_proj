var mongoose = require('mongoose')

var user = mongoose.Schema({
    username: { type: String, index: { unique: true }},
    displayImage : String,
    password: String,
    email : String,
    authen: Number,
    wishlist: [{
        name : {type: String , ref : "Cosmetic"},
        id : Number
    }]
})

module.exports = mongoose.model('User', user)
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

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

var User = module.exports = mongoose.model('User', user)

module.exports.register = function(user , callback){
    bcrypt.genSalt(10 , function(err , salt){
        bcrypt.hash(user.password , salt , function(err , hash){
            user.password = hash
            user.save(callback)
        })
    })
}

module.exports.findByUsername = function(username , callback){
    var query = {username : username}
    User.findOne(query , callback)
}

module.exports.comparePassword = function(password , hash , callback){
    bcrypt.compare(password , hash , function(err , isMatch){
        callback(null , isMatch)
    })
}
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')

var user = mongoose.Schema({
    username: { type: String, index: { unique: true } },
    displayImage: String,
    password: String,
    email: { type: String, unique: true },
    authen: Number,
    wishlist: [{
        name: { type: String, ref: "Cosmetic" },
        id: Number
    }]
})

var User = module.exports = mongoose.model('User', user)

module.exports.save = function(username, nwishlist, callback) {
    var query = { username: username }
    User.findOne(query, function(err, data) {
        data.wishlist = nwishlist
        data.save(callback)
    })
}
module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.register = function(user, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash
            user.save(callback)
        })
    })
}

module.exports.getUserByUsername = function(username, callback) {
    var query = { username: username }
    User.findOne(query, callback)
}

module.exports.getUserByEmail = function(email, callback) {
    var query = { email: email }
    User.findOne(query, callback)
}

module.exports.comparePassword = function(password, hash, callback) {
    bcrypt.compare(password, hash, function(err, isMatch) {
        callback(null, isMatch)
    })
}

module.exports.resetPassword = function(user, callback) {
    var query = { username: user.username }
    User.findOne(query, function(err, data) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(user.password, salt, function(err, hash) {
                data.password = hash
                data.authen = 0
                data.save(callback)
            })
        })
    })
}
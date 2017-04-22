var mongoose = require('mongoose')

var user = mongoose.Schema({
    username: { type: String, index: { unique: true }},
    password: String,
    authen: Number
})

module.exports = mongoose.model('User', user)
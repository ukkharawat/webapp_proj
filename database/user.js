var mongoose = require('mongoose')

var user = mongoose.Schema({
    username: {type: String , unique:true , index:true},
    password: String,
    authen: Number
})

module.exports = mongoose.model('User', user)
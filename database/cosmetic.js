var mongoose = require('mongoose')

var cosmetic = mongoose.Schema({
    brand: String,
    type: String,
    collections: String,
    name: {type: String , index:true},
    detail: String
})

module.exports = mongoose.model('Cosmetic', cosmetic)
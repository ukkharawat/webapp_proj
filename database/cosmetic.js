var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')

var cosmetic = mongoose.Schema({
    brand: String,
    type: String,
    collections: String,
    name: {type: String , unique: true , index:true},
    detail: String
})

cosmetic.plugin(autoIncrement, {inc_field: 'id'})

module.exports = mongoose.model('Cosmetic', cosmetic)
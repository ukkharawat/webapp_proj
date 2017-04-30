var mongoose = require('mongoose')
var autoIncrement = require('mongoose-sequence')

var cosmetic = mongoose.Schema({
    image: String,
    brand: String,
    category: String,
    quality: String,
    color: [{type: String}],
    name: {type: String , unique: true , index:true},
    detail: String,
    like: {
        count: Number,
        who: [{type: String , ref: 'User'}] // collect who like it
    }
})

cosmetic.plugin(autoIncrement, {inc_field: 'id'})

module.exports = mongoose.model('Cosmetic', cosmetic)
var cosmetics = require('./cosmetic')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')

module.exports.getCosmetics = function(req,res){
	mongoose.connect(dbconfig.url)
	var brand = (req.query.id).toLowerCase()
	brand = brand.charAt(0).toUpperCase() + brand.slice(1)
	cosmetics.find({brand: brand}, function(err, data){
		if (err){
		} else {
			res.json(data)
		}
		mongoose.disconnect()
	})
}

module.exports.addCosmetics = function(req,res){
	mongoose.connect(dbconfig.url)
	var aaa = new cosmetics({
		brand: req.body.brand,
		type: req.body.type,
		collections: "xxx",
		name: req.body.name,
		detail: "xxx"
	})
	aaa.save(function(err , data){
		if(err) console.log(err)
		else console.log(data)
		mongoose.disconnect()
	})
}
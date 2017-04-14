var cosmetics = require('../database/cosmetic')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')

module.exports.getCosmetics = function(req,res){
	mongoose.connect(dbconfig.url)
	var search = (req.query.search).toLowerCase()
	search = search.charAt(0).toUpperCase() + search.slice(1)
	cosmetics.find({ $or : [
		{brand: search},
		{name: search},
		{type: search},
		{collections: search}
	]}, function(err, data){
		if (!err){
			res.json(data)
		}
		mongoose.disconnect()
	})
}

module.exports.addCosmetics = function(req,res){
	if(req.cookies.auth == 1){
		mongoose.connect(dbconfig.url)
		var brand = String(req.body.brand)
		brand = brand.charAt(0).toUpperCase() + brand.toLowerCase().slice(1)
		var type = String(req.body.type)
		type = type.charAt(0).toUpperCase() + type.toLowerCase().slice(1)
		var collections = String(req.body.collections)
		collections = collections.charAt(0).toUpperCase() + collections.toLowerCase().slice(1)
		var name = String(req.body.name)
		name = name.charAt(0).toUpperCase() + name.toLowerCase().slice(1)
		
		var cosmetic = new cosmetics({
			brand: brand,
			type: type,
			collections: collections,
			name: name,
			detail: String(req.body.detail)
		})
		cosmetic.save(function(err , data){
			if(err) console.log(err)
			else console.log(data)
			mongoose.disconnect()
		})
	}
}
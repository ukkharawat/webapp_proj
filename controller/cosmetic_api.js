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
		{type: search}
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
		var aaa = new cosmetics({
			brand: req.body.brand,
			type: req.body.type,
			collections: req.body.collections,
			name: req.body.name,
			detail: req.body.detail
		})
		aaa.save(function(err , data){
			if(err) console.log(err)
			else console.log(data)
			mongoose.disconnect()
		})
	}
}
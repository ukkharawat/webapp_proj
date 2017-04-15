var cosmetics = require('../database/cosmetic')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')

module.exports.getCosmetics = function(req,res){
	if(!req.query.search){
		return
	}
	var search = (req.query.search).toLowerCase()
	search = search.charAt(0).toUpperCase() + search.slice(1)
	mongoose.connect(dbconfig.url)
	cosmetics.find({ $or : [ {brand: search}, {name: search}, {type: search}, {collections: search} ]}, function(err, data){
		if(data.length != 0){
			res.json(data)
		}else{
			res.json({message: "not found"})
		}
		mongoose.disconnect()
	})
}

function stringForm(str){
	return str.charAt(0).toUpperCase() + str.toLowerCase().slice(1)
}

module.exports.addCosmetics = function(req,res){
	if(!req.body.brand || !req.body.type || !req.body.collections || !req.body.name || !req.body.detail){
		res.json({message: "Every field can't be empty"})
	}
	if(req.cookies.auth == 1){
		var brand = stringForm(String(req.body.brand))
		var type = stringForm(String(req.body.type))
		var collections = stringForm(String(req.body.collections))
		var name = stringForm(String(req.body.name))
		mongoose.connect(dbconfig.url)
		var cosmetic = new cosmetics({
			brand: brand,
			type: type,
			collections: collections,
			name: name,
			detail: String(req.body.detail)
		})
		cosmetic.save(function(err , data){
			res.json(data)
			mongoose.disconnect()
		})
	}
}
var cosmetics = require('../database/cosmetic')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')
var fc = require('../config/function')

module.exports.getCosmetics = function(req,res){
	if(!req.query.search){
		return
	}
	var search = fc.stringForm(String(req.query.search))
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

module.exports.addCosmetics = function(req,res){
	if(!req.body.brand || !req.body.type || !req.body.collections || !req.body.name || !req.body.detail){
		res.json({message: "Every field can't be empty"})
	}
	if(req.cookies.auth == 1){
		var brand = fc.stringForm(String(req.body.brand))
		var type = fc.stringForm(String(req.body.type))
		var collections = fc.stringForm(String(req.body.collections))
		var name = fc.stringForm(String(req.body.name))
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
var cosmetics = require('../database/cosmetic')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')
var fc = require('../config/function')

/*
	getCosmetic
	addCosmetic
	editCosmetic
*/

module.exports.getCosmetics = function(req,res){
	mongoose.connect(dbconfig.url)
	cosmetics.find({}, function(err, data){
		res.json(data)
		mongoose.disconnect()
	})
}

module.exports.editCosmetics = function(req,res){
	if(!req.body.brand || !req.body.type || !req.body.collections || !req.body.name || !req.body.detail){
		res.json({message: "Every field can't be empty"})
	}
	console.log(req.body)
	if(req.cookies.auth == 1){
		var brand = fc.stringForm(String(req.body.brand))
		var type = fc.stringForm(String(req.body.type))
		var collections = fc.stringForm(String(req.body.collections))
		var name = fc.stringForm(String(req.body.name))
		mongoose.connect(dbconfig.url)
		cosmetics.find({id:req.body.id} , function(err,data){
			console.log(data)
			if(!err){
				data[0].brand = brand
				data[0].type = type
				data[0].collections = collections
				data[0].name = name
				data[0].detail = String(req.body.detail)
				data[0].save(function(err,data){
					res.json(data)
					mongoose.disconnect()
				})
			}
		})
	}
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
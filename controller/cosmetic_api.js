var cosmetics = require('../database/cosmetic')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')
var fc = require('../config/function')

/*
	getCosmetic
	getCosmeticByCategory
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

module.exports.getCosmeticByCategory = function(req,res){
	mongoose.connect(dbconfig.url)
	cosmetics.find({category : fc.stringForm(String(req.body.category))} , function(err,data){
		if(!err){
			res.json(data)
		}
		mongoose.disconnect()
	})
}

module.exports.editCosmetics = function(req,res){
	console.log(req.body)
	if(req.cookies.auth == 1){
		var brand = fc.stringForm(String(req.body.brand))
		var category = fc.stringForm(String(req.body.category))
		var color = fc.stringForm(String(req.body.color))
		var collections = fc.stringForm(String(req.body.collections))
		var name = fc.stringForm(String(req.body.name))
		mongoose.connect(dbconfig.url)
		cosmetics.findOne({id:req.body.id} , function(err,data){
			console.log(data)
			if(!err){
				data.brand = brand
				data.category = category
				data.collections = collections
				data.color = color
				data.name = name
				data.detail = String(req.body.detail)
				data.save(function(err,data){
					res.json(data)
					mongoose.disconnect()
				})
			}
		})
	}
}

module.exports.addCosmetics = function(req,res){
	if(req.cookies.auth == 1){
		var brand = fc.stringForm(String(req.body.brand))
		var color = fc.stringForm(String(req.body.color))
		var category = fc.stringForm(String(req.body.category))
		var collections = fc.stringForm(String(req.body.collections))
		var name = fc.stringForm(String(req.body.name))
		mongoose.connect(dbconfig.url)
		var cosmetic = new cosmetics({
			brand: brand,
			category: category,
			collections: collections,
			color: color,
			name: name,
			detail: String(req.body.detail)
		})
		cosmetic.save(function(err , data){
			res.json(data)
			mongoose.disconnect()
		})
	}
}
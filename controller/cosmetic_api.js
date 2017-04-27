var cosmetics = require('../database/cosmetic')
var users = require('../database/user')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')
var fc = require('../config/function')

/*
	getCosmetic
	getNewCosmetic
	getCosmeticByCategory
	addCosmetic
	editCosmetic
	likeCosmetic
	addToWishlist
*/

module.exports.getCosmetics = function(req,res){
	mongoose.connect(dbconfig.url)
	cosmetics.find({}, function(err, data){
		res.json(data)
		mongoose.disconnect()
	})
}

module.exports.getNewCosmetics = function(req,res){
	mongoose.connect(dbconfig.url)
	cosmetics.find({}).sort({id: -1}).limit(10).exec(function(err , data){
		if(err) console.log(err)
		else res.json(data)
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
			detail: String(req.body.detail),
			like : {
				count: 0,
				who: []
			}
		})
		cosmetic.save(function(err , data){
			res.json(data)
			mongoose.disconnect()
		})
	}
}

module.exports.likeCosmetics = function(req,res){
	mongoose.connect(dbconfig.url)
	cosmetics.findOne({id : req.query.id }, function(err , data){
		if(!err){
			var isContain = false
			for(var i = 0 ; i < data.like.who.length ; i++){
				if(data.like.who[i] == req.cookies.username){
					isContain = true
					var index = i
					break
				}
			}
			if(isContain){
				data.like.count--
				data.like.who.splice( index, 1 )
			}else{
				data.like.count++
				data.like.who.push(req.cookies.username)
			}
			console.log(data.like)
			data.save(function(err , data){
				res.json({message: "success"})
				mongoose.disconnect()
			})
		}
	})
}

module.exports.addToWishlist = function(req,res){
	mongoose.connect(dbconfig.url)
	users.findOne({username : req.cookies.username} , function(err, data){
		if(!err){
			var isContain = false
			for(var i = 0 ; i < data.wishlist.length ; i++){
				if(data.wishlist[i].id == req.body.id){
					isContain = true
					var index = i
					break
				}
			}
			if(isContain){
				data.wishlist.splice( index, 1 )
			}else{
				data.wishlist.push({
					name : req.body.name,
					id : req.body.id
				})
			}
			data.save(function(err , data){
				res.json({message: "success"})
				mongoose.disconnect()
			})
		}
	})
}
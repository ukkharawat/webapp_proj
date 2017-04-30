var cosmetics = require('../database/cosmetic')
var users = require('../database/user')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')
var path = require('path')
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
	cosmetics.find({}, function(err, data){
		res.json(data)
	})
}

module.exports.getNewCosmetics = function(req,res){
	cosmetics.find({}).sort({id: -1}).limit(16).exec(function(err , data){
		if(err) console.log(err)
		else res.json(data)
	})
}

module.exports.getCosmeticsByCategory = function(req,res){
	cosmetics.find({category : fc.stringForm(String(req.body.category))} , function(err,data){
		if(!err){
			res.json(data)
		}
	})
}

module.exports.editCosmetics = function(req,res){
	var brand = fc.stringForm(String(req.body.brand))
	var category = fc.stringForm(String(req.body.category))
	var color = fc.stringForm(String(req.body.color))
	var collections = fc.stringForm(String(req.body.collections))
	var name = fc.stringForm(String(req.body.name))
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
			})
		}
	})
}

module.exports.addCosmetics = function(req,res){
	var file = req.files.file
	var image = file.name
	var brand = fc.stringForm(String(req.body.brand))
	var color = fc.stringForm(String(req.body.color))
	var category = fc.stringForm(String(req.body.category))
	var specific = fc.stringForm(String(req.body.specific))
	var name = fc.stringForm(String(req.body.name))
	file.mv(path.join(__dirname , '../public/cosmetic_image/' , name + "_image." + image.split('.').pop()))
	var cosmetic = new cosmetics({
		image: name + "_image." + image.split('.').pop(),
		brand: brand,
		category: category,
		specific: specific,
		color: color,
		name: name,
		detail: String(req.body.detail),
		like : {
			count: 0,
			who: []
		}
	})
	cosmetic.save(function(err , data){
		res.redirect('/')
	})
}

module.exports.likeCosmetics = function(req,res){
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
			})
		}
	})
}

module.exports.addToWishlist = function(req,res){
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
			})
		}
	})
}
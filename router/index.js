var routes = require('express').Router()
var cosmetics = require('../model/cosmetic')
var users = require('../model/user')
var path = require('path')
var passport = require('passport')

/*
	getCosmetic
	getNewCosmetic
	getCosmeticByCategory
	addCosmetic
	editCosmetic
	addToWishlist
*/
function checkAdminAuthen(req, res, next) {
    if (req.user.authen == 1) {
        next()
    }
}

routes.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

routes.get('/getCosmetics', function(req, res) {
    cosmetics.getAllCosmetic(function(err, data) {
        res.json(data)
    })
})

routes.get('/getNewCosmetics', function(req, res) {
    cosmetics.getSortCosmetic(function(err, data) {
        res.json(data)
    })
})

routes.get('/getCosmeticsByCategory/:category', function(req, res) {
    cosmetics.getCosmeticByCategory(req.params.category, function(err, data) {
        res.json(data)
    })
})

routes.get('/getCosmeticsByBrand', function(req, res) {
    cosmetics.getCosmeticByBrand(req.query.brand, function(err, data) {
        res.json(data)
    })
})

routes.get('/addToWishlist', passport.authenticate('jwt', { session: false }), function(req, res) {
    users.getUserById(req.user._id, function(err, data) {
        var isContain = false
        for (var i = 0; i < data.wishlist.length; i++) {
            if (data.wishlist[i].id == req.query.id) {
                isContain = true
                var index = i
                break
            }
        }
        if (isContain) {
            data.wishlist.splice(index, 1)
        } else {
            data.wishlist.push({
                name: req.query.name,
                id: req.query.id
            })
        }
        data.save(function(err, data) {
            res.json(data)
        })
    })
})

routes.post('/addCosmetic', passport.authenticate('jwt', { session: false }), checkAdminAuthen, function(req, res) {
    var file = req.files.file
    var image = file.name
    file.mv(path.join(__dirname, '../public/cosmetic_image/', fc.stringForm(req.body.name) + "_image." + image.split('.').pop()))
    var cosmetic = new cosmetics({
        image: fc.stringForm(req.body.name) + "_image." + image.split('.').pop(),
        brand: fc.stringForm(req.body.brand),
        category: fc.stringForm(req.body.category),
        quality: req.body.quality,
        color: req.body.color,
        name: fc.stringForm(req.body.name),
        detail: req.body.detail,
        like: {
            count: 0,
            who: []
        }
    })
    cosmetics.addCosmetic(cosmetic, function(err, data) {
        res.json(data)
    })
})

routes.post('/editCosmetic', passport.authenticate('jwt', { session: false }), checkAdminAuthen, function(req, res) {
    cosmetics.getById(req.body.id, function(err, data) {
        var file = req.files.file
        var image = file.name
        file.mv(path.join(__dirname, '../public/cosmetic_image/', fc.stringForm(req.body.name) + "_image." + image.split('.').pop()))
        data.image = fc.stringForm(req.body.name) + "_image." + image.split('.').pop()
        data.brand = fc.stringForm(req.body.brand)
        data.category = fc.stringForm(req.body.category)
        data.quality = fc.stringForm(req.body.quality)
        data.color = req.body.color
        data.name = req.body.name
        data.detail = req.body.detail
        cosmetics.addCosmetic(data, function(err, data) {
            res.json(data)
        })
    })
})

module.exports = routes
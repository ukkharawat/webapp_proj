var routes = require('express').Router()
var cosmetics = require('../model/cosmetic')
var users = require('../model/user')
var path = require('path')
var passport = require('passport')
var multer = require('multer')
var DIR = 'public/cosmetic_image/'
var fs = require('fs')
var fc = require('../config/function')

function checkAdminAuthen(req, res, next) {
    if (req.user.authen == 1) {
        next()
    }
}

/*
	getCosmetic
	getNewCosmetic
	getCosmeticByCategory
	addCosmetic
	editCosmetic
	addToWishlist
*/


var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, `${DIR}/`)
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

routes.post('/upload', upload.any(), function(req, res) {
    res.json({ message: "upload success" })
})


routes.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

routes.post('/getCosmeticByIds', passport.authenticate('jwt', { session: false }), function(req, res) {
    cosmetics.getByIds(req.body, function(err, data) {
        res.json(data)
    })
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
        data.wishlist.push({
            id: req.query.id
        })
        users.save(data.username, data.wishlist, function(err, data) {
            if (!err) {
                res.json({ message: "success" })
            } else {
                res.json({ message: "false" })
            }
        })
    })
})

routes.get('/removeFromWishlist', passport.authenticate('jwt', { session: false }), function(req, res) {
    users.getUserById(req.user._id, function(err, data) {
        for (var i = 0; i < data.wishlist.length; i++) {
            if (data.wishlist[i].id == req.query.id) {
                data.wishlist.splice(i, 1)
                break
            }
        }
        users.save(data.username, data.wishlist, function(err, data) {
            if (!err) {
                res.json({ message: "success" })
            } else {
                res.json({ message: "false" })
            }
        })
    })
})

routes.post('/addCosmetic', passport.authenticate('jwt', { session: false }), checkAdminAuthen, function(req, res) {
    var image = req.body.image
    fs.renameSync(path.join(__dirname, '../public/cosmetic_image/' + image),
        path.join(__dirname, '../public/cosmetic_image/' + req.body.name + "_image." + image.split('.').pop()))

    var cosmetic = new cosmetics({
        image: fc.stringForm(req.body.name) + "_image." + image.split('.').pop(),
        brand: req.body.brand,
        category: fc.stringForm(req.body.category),
        quality: req.body.quality,
        color: req.body.color,
        name: fc.stringForm(req.body.name),
        detail: req.body.detail
    })
    cosmetics.addCosmetic(cosmetic, function(err, data) {
        if (!err) {
            res.json({ message: "success" })
        } else {
            res.json({ message: "false" })
        }
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
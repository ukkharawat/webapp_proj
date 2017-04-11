var routes = require('express').Router()
var cosmeticController = require('../database/cosmetic_api')
var postController = require('../database/post_api')

routes.get('/',function(req,res){
    res.sendFile(index.html)
})

routes.get('/search',cosmeticController.getCosmetics)

routes.post('/add',cosmeticController.addCosmetics)

routes.get('/all' , postController.getAllPost)

module.exports = routes
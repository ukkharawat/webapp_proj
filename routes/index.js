var routes = require('express').Router()
var cosmeticController = require('../controller/cosmetic_api')
var postController = require('../controller/post_api')

routes.get('/',function(req,res){
    res.sendFile(index.html)
})

routes.get('/search',cosmeticController.getCosmetics)

routes.post('/add',cosmeticController.addCosmetics)

routes.get('/getContent' , postController.getNewPost)

routes.get('/all' , postController.getAllPost)

module.exports = routes
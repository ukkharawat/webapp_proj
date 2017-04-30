var routes = require('express').Router()
var cosmeticController = require('../controller/cosmetic_api')
var path = require('path')

function checkAuthen(req,res,next){
    if(req.cookies.username && req.cookies.auth){
        next()
    }else{
        res.json({message: 'You have to login before like , review'})
    }
}

routes.get('/',function(req,res){
    res.sendFile(path.join(__dirname , '../public/index.html'))
})

routes.get('/getCosmetics',cosmeticController.getNewCosmetics)

routes.get('/getNewCosmetics', cosmeticController.getNewCosmetics)

routes.get('/getCosmeticsByCategory' , cosmeticController.getCosmeticsByCategory)

routes.get('/likeCosmetic' , checkAuthen , cosmeticController.likeCosmetics)

routes.post('/addToWishlist' , checkAuthen , cosmeticController.addToWishlist)

module.exports = routes
var routes = require('express').Router()
var cosmeticController = require('../controller/cosmetic_api')
var reviewController = require('../controller/review_api')
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

routes.post('/review' ,checkAuthen ,  reviewController.review)

routes.get('/getCosmetics',cosmeticController.getNewCosmetics)

routes.get('/likeCosmetic' , checkAuthen , cosmeticController.likeCosmetics)

routes.post('/addToWishlist' , checkAuthen , cosmeticController.addToWishlist)

module.exports = routes
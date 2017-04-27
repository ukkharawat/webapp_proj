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

routes.get('/getCosmetics',cosmeticController.getCosmetics)

routes.get('/getNewPost' , reviewController.getNewPost)

routes.get('/getAllPost' , reviewController.getAllPost)

routes.get('/getPost' , reviewController.getPost)

routes.get('/like' , checkAuthen , reviewController.like)

routes.post('/post' , checkAuthen , reviewController.post)

routes.post('/comment' , checkAuthen , reviewController.comment)

routes.get('/getOwnPost' , checkAuthen , reviewController.getOwnPost)

module.exports = routes
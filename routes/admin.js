var routes = require('express').Router()
var cosmeticController = require('../controller/cosmetic_api')
var path = require('path')

function checkAuth(req,res,next){
    if(req.cookies.auth == 1){
        next()
    }else{
        res.json({message: "You don't have permission"})
    }
}
routes.get('/' , checkAuth , function(req,res){
    res.sendFile(path.join(__dirname , '../public/admin.html'))
})

routes.post('/addCosmetic',checkAuth,cosmeticController.addCosmetics)


module.exports = routes
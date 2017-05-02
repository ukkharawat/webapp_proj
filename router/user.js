var routes = require('express').Router()
var users = require('../model/user')
var config = require('../config/database')
var jwt = require('jsonwebtoken')
var passport = require('passport')

/*
    Register
    Login
    ChangePassword
    getWishlist
*/

routes.post('/register', function(req,res){
    var image = req.files.sampleFile ? req.files.sampleFile.name : 'default.png'
    var user = new users({
            username : req.body.username,
            password : req.body.password,
            displayImage : req.body.username + "_image." + image.split('.').pop(),
            email : req.body.email,
            authen: 0,
            wishlist : []
    })
    users.register(user , function(err , data){
        if(image != 'default.png'){
            var file = req.files.sampleFile
            file.mv(path.join(__dirname , '../public/user_image/' , req.body.username + "_image." + image.split('.').pop()))
        }
    })
})

routes.post('/login', function(req,res){
    users.getUserByUsername(req.body.username , function(err , user){
        if(!user){
            res.json({message : "User not found"})
        }else{
            users.comparePassword(req.body.password , user.password , function(err , isMatch){
                if(isMatch){
                    const token = jwt.sign(user, config.secret, {
                        expiresIn: 604800 // 1 week
                    })
                    res.json({
                        success: true,
                        token: 'JWT '+token,
                        user: {
                            id: user._id,
                            username: user.username,
                        }
                    })    
                }else{
                    res.json({message: "Username and Password aren't match"})
                }
            })
        }
    })
})

routes.post('/changePassword', passport.authenticate('jwt', {session:false}) , function(req,res){
    users.getUserById(req.user._id , function(err , user){
        users.comparePassword(req.body.oldpassword , user.password , function(err , isMatch){
            if(isMatch){
                user.password = req.body.newpassword
                users.register(user , function(err , data){
                    res.json({message : "complete"})
                })
            }else{
                res.json({message : "Current password is wrong"})
            }
        })
    })
})

routes.get('/getWishlist', passport.authenticate('jwt', {session:false}), function(req,res){
    users.getUserById(req.user._id , function(err , user){
        res.json(user.wishlist)
    })
})

module.exports = routes
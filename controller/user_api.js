var users = require('../database/user')
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var dbconfig = require('../config/database')
var salt_factor = 10

/*
    Register
    Login
    ChangePassword
    getWishlist
*/

module.exports.register = function(req,res){
    bcrypt.genSalt(salt_factor , function(err , salt){
        bcrypt.hash(req.body.password , salt , function(err , hash){
            mongoose.connect(dbconfig.url)
            var user = new users({
                    username : req.body.username,
                    password : hash,
                    authen: 0,
                    wishlist : []
            })
            user.save(function(err , data){
                if(err) 
                    res.json({message:'This account is exists'})
                else 
                    res.json({message:'success'})
                mongoose.disconnect()
            })
        })
    })
    
}

module.exports.login = function(req,res){
    mongoose.connect(dbconfig.url)
    users.findOne({username: req.body.username} , function(err,data){
        if(data != null){
            bcrypt.compare(req.body.password , data.password , function(err , same){
                if(same){
                    res.cookie('username' , data.username , {
                        expires : new Date(Date.now() + 36000000), httpOnly: true 
                    })
                    res.cookie('auth' , data.authen , {
                        expires : new Date(Date.now() + 36000000), httpOnly: true
                    })
                    res.json({username: data.username})
                }else{
                    res.json({message: "Username and Password aren't match"})
                }
            })
        }else{
            res.json({message: "Username and Password aren't match"})
        }
        mongoose.disconnect()
    })
}

module.exports.changePassword = function(req,res){
    mongoose.connect(dbconfig.url)
    users.findOne({username: req.cookies.username} , function(err,data){
        if(data != null){
            bcrypt.compare(req.body.oldpassword , data.password , function(err , same){
                if(same){
                    bcrypt.genSalt(salt_factor , function(err , salt){
                        bcrypt.hash(req.body.newpassword , salt , function(err , hash){
                            mongoose.connect(dbconfig.url)
                            data.password = hash
                            data.save(function(err , data){
                                if(!err){
                                    res.json({message : "complete"})
                                }else{
                                    res.json({message : "incomplete"})
                                }
                                mongoose.disconnect()
                            })
                        })
                    })
                }
            })
        }else{
            res.json({message: "This account isn't exists"})
        }
        mongoose.disconnect()
    })
}

module.exports.getWishlist = function(req,res){
    mongoose.connect(dbconfig.url)
    users.findOne({username: req.cookies.username} , function(err,data){
        if(!err){
            res.json(data.wishlist)
        }
        mongoose.disconnect()
    })
}
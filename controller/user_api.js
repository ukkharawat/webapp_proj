var users = require('../database/user')
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var dbconfig = require('../config/database')
var salt_factor = 10

/*
    Register
    Login
*/

module.exports.register = function(req,res){
    if(!req.body.username || !req.body.password){
        res.json({message: 'Enter username and password'})
        return
    }
    bcrypt.genSalt(salt_factor , function(err , salt){
        bcrypt.hash(req.body.password , salt , function(err , hash){
            mongoose.connect(dbconfig.url)
            var user = new users({
                    username : req.body.username,
                    password : hash,
                    authen: 0
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
    if(!req.body.username || !req.body.password){
        res.json({message: 'Enter username and password'})
        return
    }
    mongoose.connect(dbconfig.url)
    users.findOne({username: req.body.username} , function(err,data){
        if(data != null){
            bcrypt.compare(req.body.password , data.password , function(err , same){
                res.cookie('username' , data.username , {
                    expires : new Date(Date.now() + 36000000)
                    , httpOnly: true 
                })
                res.cookie('auth' , data.authen , {
                    expires : new Date(Date.now() + 36000000)
                    , httpOnly: true
                })
                res.json({username: data.username})
            })
        }else{
            res.json({message: "This account isn't exists"})
        }
        mongoose.disconnect()
    })
}
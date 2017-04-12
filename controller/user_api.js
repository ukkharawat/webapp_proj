var users = require('../database/user')
var mongoose = require('mongoose')
var bcrypt = require('bcrypt')
var dbconfig = require('../config/database')
var salt_factor = 10

module.exports.register = function(req,res){
    mongoose.connect(dbconfig.url) 
    bcrypt.genSalt(salt_factor , function(err , salt){
        if(err) return err
        bcrypt.hash(req.body.password , salt , function(err , hash){
            var user = new users({
                    username : req.body.username,
                    password : hash,
                    authen: 0
            })
            user.save(function(err , data){
                if(err) 
                    res.json({message:'false'})
                else 
                    res.json({message:'success'})
                mongoose.disconnect()
            })
        })

    })
    
}

module.exports.login = function(req,res){
    mongoose.connect(dbconfig.url)
    if(!req.body.username || !req.body.password){
        res.json({message: 'false'})
        return
    }
    users.findOne({username: req.body.username} , function(err,data){
        if(err){
            res.json({message: "false"})
            return
        }
        bcrypt.compare(req.body.password , data.password , function(err , same){
            if(err){
                res.json({message: "false"})
                return
            }
            res.cookie('username' , data.username , {
                expires : new Date(Date.now() + 36000000)
                , httpOnly: true 
            })
            res.cookie('auth' , data.authen , {
                expires : new Date(Date.now() + 36000000)
                , httpOnly: true 
            })
            res.json({username: data.username , auth : data.authen })
            mongoose.disconnect()
        })
    })
}
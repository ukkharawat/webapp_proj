var posts = require('../database/post')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')

module.exports = {
    getNewPost: function(req,res){
        mongoose.connect(dbconfig.url)
        posts.find({}).sort({date: -1}).limit(10).exec(function(err , data){
            if(err) console.log(err)
            else res.json(data)
            mongoose.disconnect()
        })
    },
    getAllPost: function(req,res){
        mongoose.connect(dbconfig.url)
        posts.find({cosmetic_name:req.query.cosmetic}).sort({date: -1}).exec(function(err , data){
            if(err) console.log(err)
            else res.json(data)
            mongoose.disconnect()
        })
    },
    getPost: function(req,res){
        mongoose.connect(dbconfig.url)
        posts.find({_id:req.query.id} , function(err , data){
            if(err) console.log(err)
            else res.json(data)
            mongoose.disconnect()
        })
    },
    post: function(req,res){
        mongoose.connect(dbconfig.url)
        if(req.cookies.username == undefined){
            res.json({message: "You have to login before post"})
            return
        }
        var aaa = new cosmetics({
            poster: req.cookies.username ,
            cosmetic_name : req.body.cosmetic_name ,
            date: new Date() ,
            content: req.body.content, //header
            comments: [],
            like: {
                count: 0,
                who: [] // collect who like it
            },
            dislike: {
                count: 0,
                who: []
            }
        })
        aaa.save(function(err , data){
            if(err) console.log(err)
            else console.log(data)
            mongoose.disconnect()
        })
    },
    comment: function(req,res){
        mongoose.connect(dbconfig.url)
        if(req.cookies.username == undefined){
            res.json({message: "You have to login before comment"})
            return
        }
        posts.find({cosmetic_name:req.body.cosmetic_name , poster: req.body.poster , content: req.body.content}, function(err , data){
            if(!err){
                data.comments.push({
                    user: req.cookie.username,
                    comment: req.body.comment,
                    date_comment: new Date()
                })
                data.save(function(err , data){
                    if(!err)
                        res.json({message: "success"}) 
                })
            }
        })
    },
    like: function(req,res){
        mongoose.connect(dbconfig.url)
        if(req.cookies.username == undefined){
            res.json({message: "You have to login before like"})
            return
        }
        posts.find({cosmetic_name:req.body.cosmetic_name , poster: req.body.poster , content: req.body.content}, function(err , data){
            if(!err){
                var isContain = false
                for(var i = 0 ; i < data.like.who.length ; i++){
                    if(data.like.who[i] == req.cookies.username){
                        isContain = true
                        var index = i
                    }
                }
                if(isContain){
                    data.like.count--
                    data.like.who.splice( index, 1 )
                }else{
                    data.like.count++
                    data.like.who.push(req.cookies.username)
                }
                data.save(function(err , data){
                    if(!err)
                        res.json({message: "success"}) 
                })
            }
        })
    }
}
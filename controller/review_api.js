var reviews = require('../database/review')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')
var fc = require('../config/function')
/*
    likeCosmetic
    getNewPost ==> limit on 10
    getAllPost
    getPost
    getOwnPost
    post
    comment
    like

    unfinished
        editPost
        editComment
*/
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
        // user search product then they can see all post
        posts.find({cosmetic_name:req.query.cosmetic}).sort({date: -1}).exec(function(err , data){
            if(err) console.log(err)
            else res.json(data)
            mongoose.disconnect()
        })
    },
    getPost: function(req,res){
        mongoose.connect(dbconfig.url)
        // for each
        posts.find({_id:req.query.id} , function(err , data){
            if(err) console.log(err)
            else {
                var isContain = false
                for(var i = 0 ; i < data[0].like.who.length ; i++){
                    if(data[0].like.who[i] == req.cookies.username){
                        isContain = !isContain
                        break
                    }
                }
                res.json({data:data[0] , like:isContain})
            }
            mongoose.disconnect()
        })
    },
    post: function(req,res){
        mongoose.connect(dbconfig.url)
        var aaa = new posts({
            poster: String(req.cookies.username) ,
            cosmetic_name : fc.stringForm(String(req.body.cosmetic_name)) ,
            date: new Date() ,
            content: String(req.body.content), //header
            comments: [],
            like: {
                count: 0,
                who: [] // collect who like it
            }
        })
        aaa.save(function(err , data){
            if(err) console.log(err)
            else res.json(data)
            mongoose.disconnect()
        })
    },
    comment: function(req,res){
        mongoose.connect(dbconfig.url)
        posts.find({_id : req.body.id }, function(err , data){
            if(!err){
                data[0].comments.push({
                    user: req.cookies.username,
                    comment: req.body.comment,
                    date_comment: new Date()
                })
                data[0].save(function(err , data){
                    if(!err)
                        res.json({message: "success"}) 
                    mongoose.disconnect()
                })
            }
        })
    },
    like: function(req,res){
        mongoose.connect(dbconfig.url)
        posts.find({_id : req.query.id }, function(err , datas){
            var data = datas[0]
            if(!err){
                var isContain = false
                for(var i = 0 ; i < data.like.who.length ; i++){
                    if(data.like.who[i] == req.cookies.username){
                        isContain = true
                        var index = i
                        break
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
                    res.json({message: "success"})
                    mongoose.disconnect()
                })
            }
        })
    },
    getOwnPost : function(req,res){
        mongoose.connect(dbconfig.url)
        posts.find({poster:req.cookies.username} , function(err , data){
            if(err) console.log(err)
            else {
                res.json(data)
            }
            mongoose.disconnect()
        })
    }
}
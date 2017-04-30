var reviews = require('../model/review')
var mongoose = require('mongoose')
var dbconfig = require('../config/database')
var fc = require('../config/function')
/*
    
    review
    getTopReview
    getAllReview
    editReview
    likeReview
*/
var review = function(req,res){
    var aaa = {
        reviewer : req.cookies.username,
        content : String(req.body.content),
        date : new Date(),
        starPoint : Number(req.body.starPoint),
        like : {
            count : 0,
            who : []
        }
    }
    reviews.findOne({cosmetic_name : req.body.cosmetic_name},function(err,data){
        if(data == null){
            var review = new reviews({
                cosmetic_name : req.body.cosmetic_name,
                review : aaa
            })
            review.save(function(err , data){
                res.json({message : "complete"})
            })
        }else{
            data.review.push(aaa)
            data.save(function(err , data){
                res.json({message : "complete"})
            })
        }
        
    })
}
var getTopReview = function(req,res){
    reviews.findOne({cosmetic_name : fc.stringForm(String(req.query.cosmetic_name))},function(err , data){
        if(data == null){
            res.json({message : "No comment in this cosmetic"})
        }else{
            var max = 0
            for(var i = 0 ; i < data.review.length ; i++){
                if(data.review[i].like.count > max){
                    max = data.review[i].like.count
                    var index = i
                }
            }
            res.json(data.review[i])
        }
    })
}
var getAllReview = function(req,res){
    reviews.findOne({cosmetic_name : fc.stringForm(String(req.query.cosmetic_name))},function(err , data){
        if(data == null){
            res.json({message : "No comment in this cosmetic"})
        }else{
            res.json(data.review)
        }
    })
}

var editReview = function(req,res){
    reviews.findOne({cosmetic_name : req.body.cosmetic_name},function(err , data){
        for(var i = 0 ; i < data.review.length ; i++){
            if(data.review[i].content == req.body.oldcontent && data.review[i].reviewer == req.cookies.username){
                data.review[i].starPoint = req.body.starPoint
                data.review[i].date = new Date()
                break
            }
        }
        data.save(function(err , data){
            res.json(data)
        })
    })
}

var likeReview = function(req,res){
    reviews.findOne({cosmetic_name : req.body.cosmetic_name},function(err , data){
        for(var i = 0 ; i < data.review.length ; i++){
            if(data.review[i].content == req.body.content && data.review[i].reviewer == req.body.reviewer){
                var index = i 
                var isContain = false
                for(var j = 0 ; j < data.review[i].like.who.length ; j++){
                    if(data.review[i].like.who[j] == req.cookies.username){
                        isContain = true
                        data.review[index].like.count--
                        data.review[index].like.who.splice(j, 1 )
                        break
                    }
                }
                break
            }
        }
        if(!isContain){
            data.review[index].like.count++
            data.review[index].like.who.push(req.cookies.username)
        }
        data.save(function(err , data){
            if(!err)
                res.json(data)
        })
    })
}
module.exports = {
    review : review,
    getTopReview : getTopReview,
    getAllReview : getAllReview,
    likeReview : likeReview,
    editReview : editReview
}
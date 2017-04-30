var routes = require('express').Router()
var reviews = require('../model/review')

/*
    review
    getTopReview
    getAllReview
    editReview
    likeReview
*/

function checkAuthen(req,res,next){
    if(req.cookies.username && req.cookies.auth){
        next()
    }else{
        res.json({message: 'You have to login before like , review'})
    }
}

routes.post('/review' ,checkAuthen ,  function(req,res){
    var newreview = {
        reviewer : req.cookies.username,
        content : req.body.content,
        date : new Date(),
        starPoint : req.body.starPoint,
        like : {
            count : 0,
            who : []
        }
    }
    reviews.getAllReview(req.body.cosmetic_name , function(err ,review){
        if(!review){
            review = new reviews({
                cosmetic_name : req.body.cosmetic_name,
                review : newreview
            })
        }else{
            review.review.push(newreview)
        }
        reviews.review(review , function(err , data){
            res.json(data)
        })
    })
})

routes.get('/getTopReview' ,  function(req,res){
    reviews.getAllReview(req.query.cosmetic_name , function(err , data){
        if(!data){
            res.json({message : "No comment in this cosmetic"})
        }else{
            var max = 0
            var index = 0
            for(var i = 0 ; i < data.review.length ; i++){
                if(data.review[i].like.count > max){
                    max = data.review[i].like.count
                    index = i
                }
            }
            res.json(data.review[index])
        }
    })
})

routes.get('/getAllReview',  function(req,res){
    reviews.getAllReview(req.query.cosmetic_name , function(err , review){
        if(!review){
            res.json({message : "No comment in this cosmetic"})
        }else{
            res.json(review.review)   
        }
    })
})

routes.post('/likeReview' ,  checkAuthen , function(req,res){
    reviews.getAllReview(req.body.cosmetic_name , function(err , data){
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
        reviews.review(data , function(err , data){
            res.json(data)
        })
    })
})

routes.post('/editReview' ,checkAuthen ,  function(req,res){
    reviews.getAllReview(req.body.cosmetic_name , function(err , review){
        for(var i = 0 ; i < review.review.length ; i++){
            if(review.review[i].content == req.body.oldcontent && review.review[i].reviewer == req.body.username){
                review.review[i].content = req.body.newcontent
                review.review[i].starPoint = req.body.starPoint
                review.review[i].date = new Date()
                reviews.review(review , function(err , data){
                    res.json(data)
                })
                break
            }
        }
    })
})

module.exports = routes
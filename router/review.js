var routes = require('express').Router()
var reviews = require('../model/review')
var passport = require('passport')

/*
    review
    getAllReview sort by top review
    editReview
    likeReview
*/


routes.post('/review', passport.authenticate('jwt', { session: false }), function(req, res) {
    var newreview = {
        reviewer: req.user.username,
        content: req.body.content,
        date: new Date(),
        starPoint: req.body.starPoint,
        like: {
            count: 0,
            who: []
        }
    }
    reviews.getAllReview(req.body.cosmetic_name, function(err, review) {
        if (!review) {
            review = new reviews({
                cosmetic_name: req.body.cosmetic_name,
                review: newreview
            })
        } else {
            review.review.push(newreview)
        }
        reviews.review(review, function(err, data) {
            res.json({ message: err ? false : true })
        })
    })
})

routes.get('/getAllReview', function(req, res) {
    reviews.getAllReview(req.query.cosmetic_name, function(err, review) {
        if (!review) {
            res.json({ message: "No comment in this cosmetic" })
        } else {
            var review = []
            for (var i = 0; i < review.review.length; i++) {
                review.push(review.review[i])
            }
            res.json(review.sort((a, b) => b.like.count - a.like.count))
        }
    })
})

routes.get('/likeReview', passport.authenticate('jwt', { session: false }), function(req, res) {
    reviews.getReviewById(req.query.id, function(err, data) {
        for (var i = 0; i < data.review.length; i++) {
            if (data.review[i]._id == req.query.idReview) {
                var index = i
                var isContain = false
                for (var j = 0; j < data.review[i].like.who.length; j++) {
                    if (data.review[i].like.who[j] == req.user.username) {
                        isContain = true
                        data.review[index].like.count--
                            data.review[index].like.who.splice(j, 1)
                        break
                    }
                }
                break
            }
        }
        if (!isContain) {
            data.review[index].like.count++
                data.review[index].like.who.push(req.user.username)
        }
        reviews.review(data, function(err, data) {
            res.json({ message: err ? false : true })
        })
    })
})

routes.post('/editReview', passport.authenticate('jwt', { session: false }), function(req, res) {
    reviews.getReviewById(req.body.id, function(err, review) {
        for (var i = 0; i < review.review.length; i++) {
            if (data.review[i]._id == req.query.idReview && review.review[i].reviewer == req.user.username) {
                review.review[i].content = req.body.newcontent
                review.review[i].starPoint = req.body.starPoint
                review.review[i].date = new Date()
                reviews.review(review, function(err, data) {
                    res.json({ message: err ? false : true })
                })
                break
            }
        }
    })
})

module.exports = routes
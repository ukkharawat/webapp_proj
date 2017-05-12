var routes = require('express').Router()
var users = require('../model/user')
var config = require('../config/database')
var jwt = require('jsonwebtoken')
var passport = require('passport')
var nodemailer = require('nodemailer')
var multer = require('multer')
var DIR = 'public/user_image/'
var fs = require('fs')
var path = require('path')
    /*
        Register
        Login
        resetPassword 2 process
            : send email
            : reset
        getWishlist
    */
var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, `${DIR}/`)
    },
    filename: function(req, file, callback) {
        callback(null, file.originalname)
    }
})

var upload = multer({ storage: storage })

routes.post('/upload', upload.any(), function(req, res) {
    res.json({ message: "upload success" })
})

routes.post('/register', function(req, res) {
    var displayImage = req.body.displayImage
    if (req.body.displayImage != "default_image.png") {
        fs.renameSync(path.join(__dirname, '../public/user_image/' + displayImage),
            path.join(__dirname, '../public/user_image/' + req.body.username + "_image." + displayImage.split('.').pop()))
    }
    var user = new users({
        username: req.body.username,
        password: req.body.password,
        displayImage: displayImage,
        email: req.body.email,
        authen: 0,
        wishlist: []
    })
    users.register(user, function(err, data) {
        if (err) {
            res.json({ message: "This account is exist" })
        } else {
            res.json({ message: "Success" })
        }
    })
})

routes.post('/login', function(req, res) {
    users.getUserByUsername(req.body.username, function(err, user) {
        if (!user) {
            res.json({ message: "Username and Password aren't match" })
        } else {
            users.comparePassword(req.body.password, user.password, function(err, isMatch) {
                if (isMatch) {
                    const token = jwt.sign(user, config.secret, {
                        expiresIn: 604800 // 1 week
                    })
                    res.json({
                        success: true,
                        token: 'JWT ' + token,
                        user: {
                            id: user._id,
                            username: user.username,
                            authen: user.authen,
                            displayImage: user.displayImage
                        }
                    })
                } else {
                    res.json({ message: "Username and Password aren't match" })
                }
            })
        }
    })
})

routes.post('/resetPassword', function(req, res) {
    users.getUserByEmail(req.body.email, function(err, user) {
        if (err) {
            res.json({ message: "user not found" })
        } else {
            var smtpTrans = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: "test.cosmeme@gmail.com", // test email
                    pass: config.config
                }
            })
            var mailOpts = {
                from: "noreply@cosmeme.com",
                to: req.body.email,
                subject: 'Reset your account password',
                text: `please follow this link to reset your password 
                        http://localhost:3000/reset/` + user.name
            }
            smtpTrans.sendMail(mailOpts, function(error, response) {
                if (response) {
                    user.authen = -1
                    users.register(user, function(err, data) {
                        if (data) {
                            res.json({ message: "success" })
                        }
                    })
                }
            })
        }
    })
})

routes.post('/reset/:username', function(req, res) {
    users.getUserByUsername(req.params.username, function(err, data) {
        if (data.authen == -1) {
            data.password = req.body.password
            users.resetPassword(data, function(err, result) {
                res.json(result)
            })
        } else {
            res.json({ message: "you can't reset your password" })
        }
    })
})

routes.get('/getWishlist', passport.authenticate('jwt', { session: false }), function(req, res) {
    users.getUserById(req.user._id, function(err, user) {
        res.json(user.wishlist)
    })
})

module.exports = routes
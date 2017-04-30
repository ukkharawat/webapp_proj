var users = require('../database/user')
var path = require('path')

/*
    Register
    Login
    ChangePassword
    getWishlist
*/

module.exports.register = function(req,res){
    var image = req.files.sampleFile ? req.files.sampleFile.name : 'default.png'
    var user = new users({
            username : req.body.username,
            password : req.body.password,
            displayImage : req.body.username + "_image." + image.split('.').pop(),
            authen: 0,
            wishlist : []
    })
    users.register(user , function(err , data){
        if(image != 'default.png'){
            var file = req.files.sampleFile
            file.mv(path.join(__dirname , '../public/user_image/' , req.body.username + "_image." + image.split('.').pop()))
        }
    })     
}

module.exports.login = function(req,res){
    users.findByUsername(req.body.username , function(err , user){
        if(!user){
            res.json({message : "User not found"})
        }else{
            users.comparePassword(req.body.password , user.password , function(err , isMatch){
                if(isMatch){
                    res.cookie('username' , data.username , {
                        expires : new Date(Date.now() + 36000000), httpOnly: true 
                    })
                    res.cookie('auth' , data.authen , {
                        expires : new Date(Date.now() + 36000000), httpOnly: true
                    })
                    res.cookie('displayImage' , data.displayImage , {
                        expires : new Date(Date.now() + 36000000), httpOnly: true 
                    })
                    res.json({username: data.username , displayImage : data.displayImage})
                }else{
                    res.json({message: "Username and Password aren't match"})
                }
            })
        }
    })
}

module.exports.changePassword = function(req,res){
    users.findByUsername(req.cookies.username , function(err , user){
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
}

module.exports.getWishlist = function(req,res){
    users.findByUsername(req.query.username , function(err , user){
        console.log(user.wishlist)
    })
}
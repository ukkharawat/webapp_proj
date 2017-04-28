var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')
var app = express()
var cors = require('cors')
var fileUpload = require('express-fileupload')
 
var indexs = require('./router/index')
var users = require('./router/user')
var admins = require('./router/admin')

app.use(fileUpload())
app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'node_modules')))

app.use('/' , indexs)
app.use('/user' , users)
app.use('/admin' , admins)

// test cookie
app.get('/getCookie' , function(req,res){
    res.json(req.cookies)
})

app.get('/logout' , function(req,res){
    for (var prop in req.cookies) 
        res.clearCookie(prop)
    res.redirect('/')
})

// app.all('*',function(req,res){
//     res.redirect('/')
// })
app.listen(3000 || process.env.PORT , () => {
    console.log(process.env.PORT ? process.env.PORT : 3000)
})
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')
var app = express()
 
var index = require('./routes/index')
var user = require('./routes/user')

app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'node_modules')))

app.use('/' , index)
app.use('/user' , user)

// test cookie
app.get('/getCookie' , function(req,res){
    res.json(req.cookies)
})

app.all('*',function(req,res){
    res.redirect('/')
})
app.listen(3000 || process.env.PORT , () => {
    console.log(process.env.PORT ? process.env.PORT : 3000)
})
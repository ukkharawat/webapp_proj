var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')
var app = express()
var cors = require('cors')
var mongoose = require('mongoose')
var passport = require('passport')

var config = require('./config/database')
var indexs = require('./router/index')
var users = require('./router/user')
var reviews = require('./router/review')

mongoose.connect(config.url)

mongoose.connection.on('connected', () => {
    console.log('Connected to database ')
})

mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err)
})

var originsWhitelist = ['http://localhost:4200']

var corsOptions = {
    origin: function(origin, callback) {
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1
        callback(null, isWhitelisted)
    },
    credentials: true
}


app.use(cors(corsOptions))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true,
    limit: '10mb',
    parameterLimit: 1000000
}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/', indexs)
app.use('/user', users)
app.use('/review', reviews)
app.use(passport.initialize())
app.use(passport.session())
require('./config/passport')(passport)

// test cookie
app.get('/getCookie', function(req, res) {
    res.json(req.cookies)
})

app.get('/logout', function(req, res) {
    for (var prop in req.cookies)
        res.clearCookie(prop)
    res.redirect('/')
})

app.get('/failed', function(req, res) {
    res.send("This account already exists")
})

app.all('*', function(req, res) {
    res.redirect('/')
})
app.listen(3000 || process.env.PORT, () => {
    console.log(process.env.PORT ? process.env.PORT : 3000)
})
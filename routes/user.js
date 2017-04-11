var routes = require('express').Router()
var userController = require('../controller/user_api')

routes.post('/register',userController.register)

routes.post('/login',userController.login)

module.exports = routes
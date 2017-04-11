var routes = require('express').Router()
var userController = require('../database/user_api')

routes.post('/register',userController.register)

routes.post('/login',userController.login)

module.exports = routes
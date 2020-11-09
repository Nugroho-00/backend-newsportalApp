const route = require('express').Router()
const authController = require('../controllers/authController')
const usersController = require('../controllers/usersController')

route.post('/register/user', usersController.createUsers)
route.post('/login/user', authController.Login)

module.exports = route
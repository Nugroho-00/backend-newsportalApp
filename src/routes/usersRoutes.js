const route = require('express').Router()
const usersController = require('../controllers/usersController')
const uploadHelper = require('../helpers/upload')

route.get('/', usersController.getUsers)
route.get('/:id', usersController.getUser)
route.patch('/:id', uploadHelper, usersController.editUsers)
route.delete('/:id', usersController.deleteUser)

module.exports = route
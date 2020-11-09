const route = require('express').Router()
const categoryController = require('../controllers/categoryController')

route.post('/', categoryController.createCategory)
route.get('/', categoryController.getCategories)
route.get('/:id', categoryController.getCategory)
route.patch('/:id', categoryController.editCategory)
route.delete('/:id', categoryController.deleteCategory)

module.exports = route
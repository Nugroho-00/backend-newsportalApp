const route = require('express').Router()
const newsController = require('../controllers/newsController')
const uploadHelper = require('../helpers/upload')

route.post('/', uploadHelper, newsController.postNews)
route.get('/', newsController.getNews)
route.get('/:id', newsController.getNewsDetail)
route.patch('/:id', uploadHelper, newsController.editNews)
route.delete('/:id', newsController.deleteNews)

module.exports = route
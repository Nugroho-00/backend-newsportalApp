const { Category } = require('../models')
const responseStandard = require('../helpers/response')

module.exports = {
    createCategory: async (req, res) => {
        const { category } = req.body
        const data = {category}
        if (data) {
        const results = await Category.create(data)
        responseStandard(res, 'Create Category Successfully!', {results}, 201)
        } else {
        responseStandard(res, 'Failed to create Category!! please insert access Category!!', {}, 400, false)
        }     
    },
    getCategories: async (req, res) => {
        const results = await Category.findAll()
        if (results.length) {
            responseStandard(res, 'List of Category', {results}, 201)
        } else {
            responseStandard(res, 'No list data Category', {}, 401, false)
      }  
    },
    getCategory: async (req, res) => {
        const { id } = req.params
        const results = await Category.findByPk(id)
        if (results) {
            responseStandard(res, `Success show Category with id ${id}`, {results}, 201)
        } else {
            responseStandard(res, `Category with id ${id} not found!!!`, {}, 404, false)
        }
    },
    editCategory: async (req, res) => {
        const { id } = req.params
        const { category } = req.body
        const results = await Category.findByPk(id)
        if (results) {
            const data = { category }
            await results.update(data)
            if (results) {
                responseStandard(res, 'Updates Category success!!', { results }, 201)
            } else {
                responseStandard(res, `Failed to update Category with id ${id}`, {}, 401, false)
            }
        } else {
            responseStandard(res, `Category with id ${id} not found`, {}, 500, false)
        }
    },
    deleteCategory: async (req, res) => {
        const { id } = req.params
        const results = await Category.findByPk(id)
        if (results) {
            await results.destroy()
            if (results) {
                responseStandard(res, `Success deleted Category with id ${id}`, {results}, 201)
            } else {
                responseStandard(res, `Failed to deleted with id ${id}`)
            }
        } else {
            responseStandard(res, `Category with id ${id} not found`)
        }
    }
}
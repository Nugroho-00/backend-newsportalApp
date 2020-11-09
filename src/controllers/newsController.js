const { News } = require('../models')
const responseStandard = require('../helpers/response')

module.exports = {
    postNews: async (req, res) => {
        let { title, content, category_id, users_id } = req.body
        const image = `uploads/${req.file.filename}`
        const data = {title, content, image, category_id, users_id}   
        const results = await News.create(data)
        if (results) {
            responseStandard(res, 'Success create Post News !!', {data}, 201)        
        } else {
            responseStandard(res, 'Failed to register account!', {}, 401, false)
        }
    },
    getNews: async (req, res) => {
        const results = await News.findAll()
        responseStandard(res, 'List of News', {results}, 201)
    },
    getNewsDetail: async (req, res,) => {
        const { id } = req.params
        const results = await News.findByPk(id)
        responseStandard(res, `Show detail News with id ${id}`, {results}, 201)
    },
    editNews: async (req, res) => {
        const { id } = req.params
        const {title, content, category_id, users_id } = req.body
        const results = await News.findByPk(id)
        if (results) {
            const data = { title, content, category_id, users_id }          
            if (req.file) {
                const image = `uploads/${req.file.filename}`
                await results.update({...data, image})
                responseStandard(res, 'Updates News success!!', { data: {...data, image} }, 201)
            } else {
                results.update(data)
                responseStandard(res, `update News with id ${id}`, {data}, 201)
            }
        } else {
            responseStandard(res, `News with id ${id} not found`, {}, 500, false)
        }
    },
    deleteNews: async (req, res) => {
        const { id } = req.params
        const results = await News.findByPk(id)
        if (results) {
            await results.destroy()
            if (results) {
                responseStandard(res, `Success deleted News with id ${id}`, {results}, 201)
            } else {
                responseStandard(res, `Failed to deleted News with id ${id}`)
            }
        } else {
            responseStandard(res, `News with id ${id} not found`)
        }
    }
}
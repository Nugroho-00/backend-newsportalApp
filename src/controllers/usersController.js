const { Users } = require('../models')
const { userSchema: schemaU } = require('../helpers/validation')
const bcrypt = require('bcrypt')
const responseStandard = require('../helpers/response')

module.exports = {
    createUsers: async (req, res) => {
        let {  username, email, password } = req.body
        password = await bcrypt.hash(password, await bcrypt.genSalt())
        const data = {username, email, password}   
        const results = await Users.create(data)
        if (results) {
            responseStandard(res, 'Success register account!!', {results}, 201)        
        } else {
            responseStandard(res, 'Failed to register account!', {}, 401, false)
        }
    },
    getUsers: async (req, res) => {
        const results = await Users.findAll({ attributes: { exclude: ['password'] } })
        responseStandard(res, 'List of Users', {results}, 201)
    },
    getUser: async (req, res,) => {
        const { id } = req.params
        const results = await Users.findByPk(id, { attributes: { exclude: ['password'] } })
        responseStandard(res, `Show detail user with id ${id}`, {results}, 201)
    },
    editUsers: async (req, res) => {
        const { id } = req.params
        const { username, email, password, fullName, birthdate } = req.body
        const results = await Users.findByPk(id)
        if (results) {
            const data = {  username, email, password, fullName, birthdate }          
            if (req.file) {
                const picture = `uploads/${req.file.filename}`
                await results.update({...data, picture})
                responseStandard(res, 'Updates Users success!!', { data: {...data, picture} }, 201)
            } else {
                results.update(data)
                responseStandard(res, `update Users with id ${id}`, {data}, 201)
            }
        } else {
            responseStandard(res, `Users with id ${id} not found`, {}, 500, false)
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params
        const results = await Users.findByPk(id)
        if (results) {
            await results.destroy()
            if (results) {
                responseStandard(res, `Success deleted Users with id ${id}`, {results}, 201)
            } else {
                responseStandard(res, `Failed to deleted Users with id ${id}`)
            }
        } else {
            responseStandard(res, `Users with id ${id} not found`)
        }
    }
}
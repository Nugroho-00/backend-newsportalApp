const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const responseStandard = require('../helpers/response')
const { Users } = require('../models')
const { APP_KEY } = process.env

module.exports = { 
    Login: async (req, res) => {
        const { email, password } = req.body
        const results = await Users.findAll({where: {email: email}})
        if (results.length) {
          const hashed = results[0].password
          const compared = await bcrypt.compare(password, hashed)
            if (compared) {
                const User = {
                    id: results[0].id,
                    username: results[0].username,
                    email: results[0].email
                }
                const token = jwt.sign({ User }, APP_KEY)
                responseStandard(res, 'Login as Successfully!! Welcome', {token}, 201)
            } else {
                responseStandard(res, 'Wrong email or password', {}, 400, false)
         }
        } else {
           responseStandard(res, 'Wrong email or password', {}, 400, false)
        }
      }
}
require('dotenv'), config()
const { APP_KEY } = process.env
const jwt = require('jsonwebtoken')
const responseStandard = require('../helpers/response')

module.exports = {
    auth: (req, res, next) => {
        const { authorization } = req.headers
        if (authorization && authorization.startsWith('Bearer ')) {
            const token = authorization.slice(7, authorization.length)
            try {
              const verify = jwt.verify(token, APP_KEY)
              if (verify) {
                req.data = verify
                next()
              } else {
                return responseStandard(res, 'Unauthorized', {}, 401, false)
              }
            } catch (err) {
              return responseStandard(res, err.message, {}, 500, false)
            }
          } else {
            return responseStandard(res, 'Forbidden Access', {}, 403, false)
          }
    }
}
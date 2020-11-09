const joi = require('joi')

module.exports = {
  userSchema: joi.object({
    username: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    email: joi.string().required(),
    password: joi.string().required()
  }),
  newsSchema: joi.object({
    title: joi.string().required().replace(/'/g, "\'").replace(/"/g, '\"'),
    content: joi.string().required(),
    category_id: joi.number().required(),
    users_id: joi.number().required(),
  })
}
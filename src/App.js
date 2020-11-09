const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// Env
const app = express()
const { APP_PORT } = process.env

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(cors())

// Routing
const authRoute = require('./routes/authRoutes')
const newsRoute = require('./routes/newsRoutes')
const usersRoute = require('./routes/usersRoutes')
const categoryRoute = require('./routes/categoryRoutes')

// route roles
app.use('/auth', authRoute)
app.use('/users', usersRoute)
app.use('/news', newsRoute)
app.use('/category', categoryRoute)

// Test Connection
app.get('/', (req, res) => {
    res.send({
        success: true,
        message: 'Work!! Backend Is Running !!!'
    })
})

app.listen(APP_PORT, () => {
    console.log(`App listening on port ${APP_PORT}`)
})
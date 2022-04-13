const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')
const authRouter = require('./routes/auth')
const usersRouter = require('./routes/users')
const buildingRouter = require('./routes/building')
const agencyRouter = require('./routes/agency')

const dotenv = require('dotenv')
const { authenMiddleware, authorizeMiddleware } = require('./helpers/auth')
const { ROLE } = require('./constant')

dotenv.config()
mongoose.connect('mongodb://localhost:27017/project')

const app = express()
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', authenMiddleware, authorizeMiddleware([ROLE.SYSTEM, ROLE.LOCAL_ADMIN]), usersRouter)
app.use('/buildings', authenMiddleware, authorizeMiddleware([ROLE.SYSTEM]), buildingRouter)
app.use('/agency', authenMiddleware, authorizeMiddleware([ROLE.SYSTEM, ROLE.LOCAL_ADMIN]), agencyRouter)
app.use('/auth', authRouter)

module.exports = app

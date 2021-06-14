
const express = require('express')
const cors = require('cors')

//const kodersRouter = require('./routers/abogados')
const usersRouter = require('./routers/users')

const logger = require('./middlewares/logger')

const app = express()
app.use(cors())
app.use(express.json())

app.use(logger)

//app.use('/koders', abogadosRouter)
app.use('/users', usersRouter)


module.exports = app
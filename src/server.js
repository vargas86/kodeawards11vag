
const express = require('express')
const cors = require('cors')

//const kodersRouter = require('./routers/abogados')
const usersRouter = require('./routers/users')
const clientsRouter = require('./routers/clients')
const clientsCaseRouter = require('./routers/clientCase')

const logger = require('./middlewares/logger')

const app = express()
app.use(cors())
app.use(express.json())

app.use(logger)

//app.use('/koders', abogadosRouter)
app.use('/users', usersRouter)
app.use('/clients', clientsRouter)
app.use('/clientsCase', clientsCaseRouter)


module.exports = app
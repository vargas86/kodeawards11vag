
const express = require('express')
const cors = require('cors')

const clientsRouter = require('./routers/clients')
const clientsCaseRouter = require('./routers/clientCase')
const casesRouter = require('./routers/cases')
const abogadosRouter = require('./routers/abogados')

const logger = require('./middlewares/logger')

const app = express()
app.use(cors())
app.use(express.json())

app.use(logger)

app.use('/clients', clientsRouter)
app.use('/clientsCase', clientsCaseRouter)
app.use('/cases', casesRouter)
app.use('/abogados', abogadosRouter)


module.exports = app
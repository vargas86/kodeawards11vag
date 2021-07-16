
require('dotenv').config()

const server = require('../src/server')
const dbConnect = require('../src/lib/db')

dbConnect()
module.exports = server 

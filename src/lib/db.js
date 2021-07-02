
const mongoose = require('mongoose')

const {
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_NAME 
} = process.env

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`

function connect () {
  console.log(url)
    return mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  }
  
  module.exports = connect

const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  email: {
    type: String,
    match: /.+@.+\..+/,
    maxLength: 100,
    required: true
  },
  password: {
    type: String,
    required: true,
    minLength: 1
  },
  role: {
    type: [String],
    enum: [ 'admin', 'abogado', 'user' ],
    minLength: 1,
    required: true
  },
  telefono: {
    type: String,
    required: true,
    minLength: 1
  },
  telefono: {
    type: String,
    required: true,
    minLength: 1
  },
  curp: {
    type: String,
    required: true,
    minLength: 1
  },
  domicilio: {
    type: String,
    required: true,
    minLength: 1
  },
  preferencias: {
    type: String,
    required: true,
    minLength: 1
  },
  nacimiento: {
    type: String,
    required: true,
    minLength: 1
  },
})

const model = mongoose.model('users', usersSchema)

module.exports = model

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
    enum: [ 'admin', 'abogado', 'cliente', 'user' ],
    minLength: 1,
    required: true
  },
  idCard: {
    type: String,
    required: true,
    minLength: 1
  },
  phone: {
    type: String,
    required: true,
    minLength: 1
  },
  imgProfile: {
    type: String,
    required: true,
    minLength: 1
  },
  date: {
    type: Date,
    required: true,
    minLength: 1
  },
  adress: {
    type: String,
    required: true,
    minLength: 1
  },
  description: {
    type: String,
    required: true,
    minLength: 1
  },
  linkedin: {
    type: String,
    required: true,
    minLength: 1
  },
  enterprise: {
    type: String,
    required: true,
    minLength: 1
  },
  website: {
    type: String,
    required: true,
    minLength: 1
  },
  dateCreation: {
    type: Date,
    required: true,
    minLength: 1
  },
  isDeleted: {
    type: Boolean,
    required: true,
    minLength: 1
  },
})

const model = mongoose.model('users', usersSchema)

module.exports = model
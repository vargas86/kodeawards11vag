
const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20
  },
  lastName: {
    type: String,
    minLength: 2,
    maxLength: 20,
    required : true
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
  phone: {
    type: String,
    minLength: 1
  },
  idCard: {
    type: String,
    minLength: 1
  },
  imgProfile: {
    type: String,
    minLength: 1
  },
  date: {
    type: String,
    minLength: 1
  },
  address: {
    type: String,
    minLength: 1
  },
  description: {
    type: String,
    minLength: 1
  },
  linkedin: {
    type: String,
    minLength: 1
  },
  enterprise: {
    type: String,
    minLength: 1
  },
  website: {
    type: String,
    minLength: 1
  },
  dateCreation: {
    type: Date,
    minLength: 1
  },
  isDeleted: {
    type: Boolean,
    minLength: 1
  },
  role: {
    type: [String],
    enum: [ 'abogado' ],
    minLength: 1,
    required: true
  },
})

const model = mongoose.model('abogados', usersSchema)

module.exports = model
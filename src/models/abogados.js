
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
  adress: {
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

/*

	 "name": "rodrigo",
  "lastName": "jauregui",
  "email": "jau@gmail.com",
  "password": "kodemia123",
  "phone": "55555555",
  
  "idCard": "bla",
  "imgProfile": "https://picsum.photos/200/300",
  "date": "123456",
  "adress":"cerro",
  "description":"soy blbalalba",
  "linkedin": "linkedin",
  "enterprise":"occ",
  "website": "www.mnpnoino",
  "dateCreation": "Wed Dec 19 2012 01:03:25 GMT-0500 (EST)",
  "isDeleted": false,
  "role": "abogado"
  */
const mongoose = require('mongoose')

const clientsSchema = new mongoose.Schema({
    name : {
        type : String,
        minLength : 1,
        required : true
    },
    lastName : {
        type : String,
        minLength : 1,
        required : true
    },
    email : {
        type: String,
        match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm, 'You must set a valid email'],
        required : true
    },
    password : {
        type: String,
        minLength: 1,
        required: true
    },
    phoneNumber : {
        type: String,
        match : /[0-9+-]{2}/gm,
        required : true
    },
    curp : {
        type : String,
        match: /[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z0-9]{2}/gm,
        required : true
    },
    address : {
        type : String,
        minLength : 20,
        required: true
    },
    preferences : {
        type : [String],
        enum : ['civil', 'ambiente', 'urbanización', 'transporte']
    },
    birthDate : {
        type : String,
        match : /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/gm,
        required : true
    },
    creationDate : {
        type: String,
        required : true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
})

const model = mongoose.model('clients', clientsSchama)

module.exports = model
const mongoose = require('mongoose')

const clientsSchema = new mongoose.Schema({
    firstName : {
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
<<<<<<< HEAD

=======
>>>>>>> 0e50e758d89e37019d617363b4b32edb33bde14c
    },
    curp : {
        type : String,
        match: /[A-Z]{4}[0-9]{6}[A-Z]{6}[A-Z0-9]{2}/gm,
<<<<<<< HEAD

=======
>>>>>>> 0e50e758d89e37019d617363b4b32edb33bde14c
    },
    address : {
        type : String,
        minLength : 20,
<<<<<<< HEAD

=======
>>>>>>> 0e50e758d89e37019d617363b4b32edb33bde14c
    },
    preferences : {
        type : [String],
        enum : ['civil', 'ambiente', 'urbanización', 'transporte']
    },
    birthDate : {
        type : String,
        match : /[0-9]{2}\/[0-9]{2}\/[0-9]{4}/gm,
    },
    creationDate : {
        type: String,
<<<<<<< HEAD
        // required : true
=======
>>>>>>> 0e50e758d89e37019d617363b4b32edb33bde14c
    },
    isDeleted : {
        type : Boolean,
        default : false
    },
    casesSigned : {
        type : Object,
        default  : {},
        required : true
    }
})

const model = mongoose.model('clients', clientsSchema)

module.exports = model

/*
"name": "rodrigo",
    "lastName": "jau",
    "email": "jau@gmail.com",
    "password": "kodemia123",
    "phoneNumber": "55-55-55-55-55",
    "curp": "JAGR911223HDFRMD08",
    "address": "cerro sanbhjbougoubgohipjojpjpo",
    "birthDate": "12-12-1212",
    "creationDate": "kblkbkjb",
    "isDeleted": false
*/
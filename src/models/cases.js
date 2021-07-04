const mongoose = require('mongoose')

const casesSchema = new mongoose.Schema({
    image:{
        type : String,
        required : true
    },
    title : {
        type : String,
        minLength : 5,
        required : true
    },
    shortDescription : {
        type : String,
        maxLength : 50,
        required : true
    },
    longDescription : {
        type : String,
        minLength : 50,
        required : true
    },
    sentenceEffects : {
        type : String,
        default : ['registering'],
        required : true
    },
    authorities : {
        type : Object,
        required : true
    },
    plaint : {
        type : String,
        required : true
    },
    cost : {
        type : Number,
        required : true,
        min : 500,
        default : 500 
    },
    limitDate : {
        type : String,
        required : true
    },
    aditionals : {
        type : [String]
    },
    status : {
        type : String,
        enum : ['registering', 'signed', 'active', 'closed'],
        required : true,
        default : 'registering'
    },
    updates : {
        type : Object
    },
    creationDate : {
        type: String,
        required : true
    },
    responsibleUser : {
        type : String,
        required : true
    }
})

const model = mongoose.model('cases', casesSchema)

module.exports = model

/*
"image":"https://picsum.photos/200",
    "title" :"aborto legal",
    "shortDescription" :"amparo para el aborto legal",
    "longDescription" : "amparo para el aborto legal en el estado de jalisco bajo conidiciones dignas y en igualdad de circunstancias blablablablaa",
    "sentenceEffects" : "se busca la inconstitucionalidad de la norma del codigo poenal que prohibe el aborto",
    "autoridadesResponsables" : { "a":"presidente"},
    
    "plaint" : "demanda de amparo",
    "cost" :500,
    
    "limitDate" : "18 de marzo",
    "aditionals" : ["bla", "ble"],
    "status" : "active",
    
    "updates" : {"a":"bla"},
    "creationDate" : "hoy",
    "responsibleUser" : "60dfd780687dc81f72bf51e5"
*/
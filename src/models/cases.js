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
        required : true
    },
    longDescription : {
        type : String,
        required : true
    },
    sentenceEffects : {
        type : String,
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
    },
    signers : {
        type : [String],
        default  : [],
        required : true
    },
    documents : {
        type : Object
    }
})

const model = mongoose.model('case', casesSchema)

module.exports = model
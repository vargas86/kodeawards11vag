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
        maxLength : 25,
        required : true
    },
    longDescription : {
        type : String,
        minLength : 25,
        required : true
    },
    sentenceEffects : {
        type : [String],
        default : ['registering'],
        required : true
    },
    sentenceEffects : {
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

const model = mongoose.model('case', casesSchema)

module.exports = model
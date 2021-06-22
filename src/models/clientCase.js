const mongoose = require('mongoose')

const clientCaseSchema = new mongoose.Schema({
    clientId :{
        type : String,
        required : true
    },
    caseId : {
        type : String,
        required : true
    },
    answers : {
        type : [String]
    },
    createdAt : {
        type : String,
        required : true
    }
})

const model = mongoose.model('client-case', clientCaseSchema)

module.exports = model
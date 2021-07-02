const clientCase = require('../models/clientCase.js')

async function getAll () {
    return await clientCase.find({})
}

function newCase (caseID, clientID, answers) {
    return clientCase.create({caseID, clientID, answers})
}

async function getById (id){
    return await clientCase.findById({id})
}

async function getSingleCase (id){
    return await clientCase.find({id})
}

module.exports = {
    getAll,
    newCase,
    getById,
    getSingleCase
}
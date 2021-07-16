const cases = require('../models/cases')

async function getAll() {
    const allCases =  await cases.find({})
    const count = await cases.find({}).count()
    return {allCases, count}
}

async function newCase({
    image,
    title,
    shortDescription,
    longDescription,
    sentenceEffects,
    authorities,
    plaint,
    cost,
    limitDate,
    aditionals,
    signers,
    status,
    updates,
    creationDate,
    responsibleUser
}) {
    return cases.create({
        image,
        title,
        shortDescription,
        longDescription,
        sentenceEffects,
        authorities,
        plaint,
        cost,
        limitDate,
        signers,
        aditionals,
        status,
        updates,
        creationDate,
        responsibleUser
    })
}

async function getById(id) {
    return await cases.findById({
        id
    })
} 

async function getSingleCase(id) {
    return await cases.find({
       _id : id
    })
}

async function update(caseId, newData) {
    const caseToUpdate = await cases.findOneAndUpdate({caseId, newData})

    if (!caseToUpdate) {
        throw new Error('Invalid data')
    }
    return caseToUpdate
}


module.exports = {
    getAll,
    newCase,
    getById,
    getSingleCase,
    update
}
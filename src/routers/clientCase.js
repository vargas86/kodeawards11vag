const express = require('express')
const clientCase = require('../useCases/clientCase')
const router = express.Router()
router.use(express.json())

router.get('/', async (request, response) =>{
    try {
        const caseId = request.query.caseId || ''
        const clientId = request.query.clientId || ''
        let casesToGet
        if(caseId){
            casesToGet = await clientCase.getSingleCase(caseId)
        }
        else if(clientId){
            casesToGet = await clientCase.getSingleCase(clientId)
        }
        else{
            tagsToGet = await clientCase.getAll()
        }
        response.json({
            success : true,
            msg : 'Cases got',
            data: {
                tags : tagsToGet
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success : false,
            msg : 'Could not get cases',
            error : error.message
        })
    }
})

module.exports = router
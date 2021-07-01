const express = require('express')
const cases = require('../useCases/cases')
const router = express.Router()

router.use(express.json())

router.post('/', async (request, response) => {
    try {
        const newCase = await cases.newCase(request.body)
        response.json({
            success: true,
            msg: 'Case registered successfully',
            data: {
                user: newCase
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not post the case',
            error: error.message
        })
    }
})

router.get('/', (request, response) => {
    try {
        const allCases = await cases.getAll()
        response.json({
            success: true,
            msg: 'All cases got',
            data: {
                User: allCases
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not get all cases',
            error: error.message
        })
    }
})


router.get('/:id', async (request, response) => {
    try {
        const {
            id
        } = request.body
        const currentCase = await cases.getById({id})
        response.json({
            success: true,
            msg: 'Current case set',
            data: {
                User: currentCase
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not get current case',
            error: error.message
        })
    }
})

router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const caseToUpdate = cases.update(id, request.body)
        response.json({
            success: true,
            msg: 'Case updated successfully',
            data: {
                newCaseData: 'Changes done'
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not update',
            error: error.message
        })

    }
})



module.exports = router
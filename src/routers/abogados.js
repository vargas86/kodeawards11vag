
const express = require('express')

const router = express.Router()

const abogados = require('../usecases/abogados')

router.post('/', async (request, response) => {
    try {
        const newAbogado = await abogados.signUp(request.body)

        response.json({
            success: true,
            message: 'Abogado Registrado',
            data: {
                Abogado: newAbogado
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Could not register',
            error: error.message
        })
    }
})

router.get('/', async (request, response) => {
    try {
        const allAbogados = await abogados.getAll()

        response.json({
            success: true,
            message: 'All Abogados',
            data: {
            users: allAbogados 
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Could not get users',
            error: error.message
        })
    }
})

router.post('/login', async (request, response) => {
    try {
        const { email, password } = await request.body
        const token = abogados.login(email, password)

        response.json({
            success: true,
            message: 'logged in',
            data: {
                token
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: error.message
        })
    }
})

module.exports = router



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


router.post('/login', async (request, response) => {
    try {
        const { email, password } =  request.body
        const token = await abogados.login(email, password)

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
            success: "Could not log in",
            message: error.message
        })
    }
})


router.get('/', async (request, response) => {
    try {
        const {email} = request.body;
        const currentUser = await abogados.currentUser(email)

        response.json({
            success: true,
            message: 'specific lawyer',
            data: {
            user: currentUser 
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            message: 'Could not get lawyer',
            error: error.message
        })
    }
})

module.exports = router


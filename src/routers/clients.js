const express = require('express')
const users = require('../useCases/clients')
const jwt = require('../lib/jwt')
const router = express.Router()

router.use(express.json())


router.post('/', async (request, response) => {
    try {
        const newUser = await users.register(request.body)
        const token = await users.login(request.body.email, request.body.password)

        response.json({
            success: true,
            msg: 'User registered successfully',
            data: {
                user: newUser,
                token
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not register',
            error: error.message
        })
    }
})

router.post('/login', async (request, response) => {
    try {
        const {
            email,
            password
        } = request.body
        const token = await users.login(email, password)
        response.json({
            success: true,
            msg: 'Logged in',
            data: {
                token
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not log in',
            error: error.message
        })
    }
})

router.get('/:token', async (request, response) => {
    try {
        const {
            token
        } = request.params
        const userId = jwt.verify(token)
        console.log(userId.id)
        const currentUser = await users.getOne(userId.id)
        response.json({
            success: true,
            msg: 'Current user set',
            data: {
                User: currentUser
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not set current user',
            error: error.message
        })
    }
})


router.get('/:id', async (request, response) => {
    try {
        const {
            id
        } = request.params
        const currentUser = await users.getOne(id)
        response.json({
            success: true,
            msg: 'Current user got',
            data: {
                User: currentUser
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not get user',
            error: error.message
        })
    }
})

router.get('/', async (request, response) => {
    try {
        const allUsers = await users.getAll()
        response.json({
            success:true,
            msg:'Todo OK',
            data : {
                allUsers
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not get users',
            error: error.message
        })
    }
    
    
   
    
})

//Éste también sirve para el delete User porque sólo se modifica el parámetro isDeteled a true
router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id
        const modifiedUser = users.update(id, request.body)
        response.json({
            success: true,
            msg: 'User updated successfully',
            data: {
                newUserData: 'Changes done'
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
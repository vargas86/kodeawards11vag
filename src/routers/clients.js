const express = require('express')
const users = require('../useCases/clients')
const jwt = require('../lib/jwt')
const router = express.Router()
const fs = require('fs')
const sgMail = require('@sendgrid/mail')

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

router.get('/tkn/:token', async (request, response) => {
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


router.get('/id/:id', async (request, response) => {
    try {
        const {
            id
        } = request.params
        console.log("OK")
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
        const {
            allUsers,
            count,
            signers,
            signersCount
        } = await users.getAll()
        response.json({
            success: true,
            msg: 'Todo OK',
            data: {
                allUsers,
                count,
                signers,
                signersCount
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









router.post('/forget-password', async (request, response) => {
    try {
        const {email} = request.body

        const html = fs.readFileSync('./src/emails/ResetPasswordMail.html', "utf8")

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email, // Change to your recipient
            from: 'hugotoca@gmail.com', // Change to your verified sender
            subject: "Reset your password in Alza La Voz",
            html
        };

        await sgMail.send(msg)

        response.json({
            success : true,
            msg : "Email sent",
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not send mail',
            error: error.message
        })
    }
})

router.post('/suscribe', async (request, response) => {
    try {
        const {email} = request.body
        console.log('Suscribe', email)

        const html = fs.readFileSync('./src/emails/Suscribe.html', "utf8")

        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: email, // Change to your recipient
            from: 'hugotoca@gmail.com', // Change to your verified sender
            subject: "Thank you for suscribe to our newsletter",
            html
        };

        await sgMail.send(msg)

        response.json({
            success : true,
            msg : "Email sent",
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not send mail',
            error: error.message
        })
    }
})

module.exports = router
const express = require('express')
const Abogados = require('../usecases/abogados')
const jwt = require('../lib/jwt')
const router = express.Router()
const fs = require('fs')
const sgMail = require('@sendgrid/mail')

router.use(express.json())


router.post('/register', async (request, response) => {
    try {
        const newLawyer = await Abogados.register(request.body)
        const token = await Abogados.login(request.body.email, request.body.password)

        response.json({
            success: true,
            msg: 'Lawyer registered successfully',
            data: {
                lawyer: newLawyer,
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
        const token = await Abogados.login(email, password)
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
        const lawyerId = jwt.verify(token)
        console.log('ID', lawyerId.id)
        const currentLawyer = await Abogados.getOne(lawyerId.id)
        console.log("CL", currentLawyer)
        response.json({
            success: true,
            msg: 'Current lawyer set',
            data: {
                lawyer: currentLawyer
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not set current lawyer',
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
        const currentLawyer = await Abogados.getOne(id)
        response.json({
            success: true,
            msg: 'Current lawyer got',
            data: {
                lawyer: currentLawyer
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not get lawyer',
            error: error.message
        })
    }
})

router.get('/', async (request, response) => {
    try {
        allAbogados = await Abogados.getAll()
        response.json({
            success: true,
            msg: 'Todo OK',
            data: {
                allAbogados,
                
            }
        })
    } catch (error) {
        response.status(400)
        response.json({
            success: false,
            msg: 'Could not get Abogados',
            error: error.message
        })
    }




})

//Éste también sirve para el delete lawyer porque sólo se modifica el parámetro isDeteled a true
router.put('/id/:id', async (request, response) => {
    try {
        const id = request.params.id
        const modifiedlawyer = Abogados.update(id, request.body)
        response.json({
            success: true,
            msg: 'lawyer updated successfully',
            data: {
                newlawyerData: 'Changes done'
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
            from: 'towerstt3@gmail.com', // Change to your verified sender
            subject: "Reset your password",
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
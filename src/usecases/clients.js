const Users = require('../models/clients.js')
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

async function register({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    curp,
    address,
    preferences,
    birthdate,
    creationDate,
    isDeleted,
    casesSigned
}) {
    const userFound = await Users.findOne({
        email
    })

    if (userFound) {
        throw new Error('User already exists')
    }

    const encryptedPassword = await bcrypt.hash(password)
    return Users.create({
        firstName,
        lastName,
        email,
        password : encryptedPassword,
        phoneNumber,
        curp,
        address,
        preferences,
        birthdate,
        creationDate,
        isDeleted,
        casesSigned
    })
}

async function login(email, password) {
    const userFound = await Users.findOne({
        email
    })

    if (!userFound) {
        throw new Error('Invalid data')
    }
    const isValidPsw = await bcrypt.compare(password, userFound.password)

    if (!isValidPsw) throw new Error('Invalid data')

    return jwt.sign({
        id: userFound._id
    })
}

async function currentUser(email) {
    return await Users.find({
        email
    })
}

async function update(id, newData) {
    const encryptedPassword = await bcrypt.hash(newData.password)
    const userToUpdate = await Users.findByIdAndUpdate({_id : id}, {...newData, password : encryptedPassword})

    if (!userToUpdate) {
        throw new Error('Invalid data')
    }
    return userToUpdate
}

async function getOne(userID) {
    return Users.find({
        _id: userID
    })
}

async function getUser(username) {
    return Users.find({
        username
    })
}

async function getAll(){
    const allUsers = await Users.find({})
    const count = await Users.find({}).count()
    const signers = await Users.find({"casesSigned.1" : {$exists : true}}, ["casesSigned"])
    const signersCount = signers.reduce ((sum, el) => {
        return sum + el.casesSigned.length
    },0)
    return {allUsers, count, signers, signersCount}
}

module.exports = {
    register,
    login,
    currentUser,
    update,
    getOne,
    getUser,
    getAll
}
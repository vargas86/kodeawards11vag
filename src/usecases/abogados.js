const Users = require('../models/abogados')
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

async function register({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    idCard,
    imgProfile,
    birthdate,
    address,
    description,
    linkedin,
    enterprise,
    website,
    creationDate,
    isDeleted
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
      idCard,
      imgProfile,
      birthdate,
      address,
      description,
      linkedin,
      enterprise,
      website,
      creationDate,
      isDeleted
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
    const userToUpdate = await Users.findByIdAndUpdate({_id : id}, newData)

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
    return await Users.find({})

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
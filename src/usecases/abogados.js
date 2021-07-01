
const Abogados = require('../models/abogados')
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

function getAll () {
  return Abogados.find()
}

function getById (id) {
  return Abogados.findById(id)
}

async function signUp ({ name, email, password, role }) {

  const abogadoFound = await Abogados.findOne({ email })

  if (abogadoFound) {
    throw new Error('Abogado ya existe')
  }

  const encriptedPassword = await bcrypt.hash(password)

  return Abogados.create({
    name,
    email,
    password: encriptedPassword,
    role
  })
}

async function login (email, password) {
  const abogadoFound = await Abogados.findOne({ email })

  if(!abogadoFound) {
    throw new Error('Invalid data email')
  }
  
  const isValidPassword = await bcrypt.compare(password, abogadoFound.password)
  
  if(!isValidPassword) {
    throw new Error('Invalid data password')
  }

  return jwt.sign({ id: userFound._id })

}

module.exports = {
  getAll,
  signUp,
  login,
  getById
}
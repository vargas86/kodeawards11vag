
const Abogados = require('../models/abogados')
const bcrypt = require('../lib/bcrypt')
const jwt = require('../lib/jwt')

function getAll () {
  return Abogados.find()
}

function getById (id) {
  console.log('ID UC', id)
  return Abogados.find({_id : id})
}

async function currentUser(email) {
  return await Abogados.find({
      email
  })
}

async function signUp ({ name, lastName, email, password, role, telefono, curp, domicilio, preferencias, nacimiento }) {

  const abogadoFound = await Abogados.findOne({ email })

  if (abogadoFound) {
    throw new Error('Abogado ya existe')
  }

  const encriptedPassword = await bcrypt.hash(password)

  return Abogados.create({
    name,
    lastName,
    email,
    password: encriptedPassword,
    role, 
    telefono, 
    curp, 
    domicilio, 
    preferencias, 
    nacimiento
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

  return jwt.sign({ id: abogadoFound._id })

  

}

module.exports = {
  getAll,
  signUp,
  login,
  getById,
  currentUser
}
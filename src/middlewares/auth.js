
const jwt = require('../lib/jwt')
const abogados = require('../usecases/abogados')

function auth (request, response, next) {
  try {
    const { authorization: token } = request.headers
    console.log('token: ', token)
  
    const isValidToken = jwt.verify(token)

    console.log('isValidToken: ', isValidToken)
  
    if (!isValidToken) {
      throw new Error('Not Authorized')
    }
  
    next()
  } catch (error) {
    response.status(401)
    response.json({
      success: false,
      message: 'Not Authorized',
      error: error.message
    })
  }

}

function authRoles (allowedRoles) {
  return async (request, response, next) => {
    try {
      const { authorization: token } = request.headers
      console.log('token: ', token)
    
      const isValidToken = jwt.verify(token)
    
      if (!isValidToken) {
        throw new Error('Not Authorized')
      }

      const abogadoFound = await abogado.getById(isValidToken.id)

      const abogadoRoles = abogadoFound.role || []

      const isAllowedRole = abogadoRoles.find(abogadoRole => {
        return allowedRoles.find( allowedRole => abogadoRole === allowedRole )
      })

      if (!isAllowedRole) {
        throw new Error('Insufficient permissions')
      }
      
      next()
    } catch (error) {
      response.status(401)
      response.json({
        success: false,
        message: 'Not Authorized',
        error: error.message
      })
    }
  }
}

module.exports = {
  auth,
  authRoles
}
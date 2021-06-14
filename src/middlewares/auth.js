
const jwt = require('../lib/jwt')
const users = require('../usecases/users')

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

      const userFound = await users.getById(isValidToken.id)

      const userRoles = userFound.role || []

      const isAllowedRole = userRoles.find(userRole => {
        return allowedRoles.find( allowedRole => userRole === allowedRole )
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
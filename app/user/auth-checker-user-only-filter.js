const userRequestAuthorizer = require('./user-request-authorizer')

const authCheckerUserOnlyFilter = (req, res, next) => {
  if (req.originalUrl.startsWith('/swagger-ui.html') ||
      req.originalUrl.startsWith('/webjars') ||
      req.originalUrl.startsWith('/swagger-resources') ||
      req.originalUrl.startsWith('/v2/')
  ) {
    next()
  } else {
    //    console.log(`RR: ${req.originalUrl}`)

    req.authentication = {}

    userRequestAuthorizer
      .authorise(req)
      .then(user => {
        req.authentication.user = user
        return null
      })
      .then(() => next())
      .catch(error => {
        console.warn('Unsuccessful user authentication', error)
        error.status = error.status || 401
        next(error)
      })
  }
}

module.exports = authCheckerUserOnlyFilter

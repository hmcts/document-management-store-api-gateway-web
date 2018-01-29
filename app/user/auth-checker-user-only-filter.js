const userRequestAuthorizer = require('./user-request-authorizer')
const {logging} = require('../logging/dm-logger')
const logger = logging.getLogger('auth-checker-user-only-filter.js')

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
        req.headers['user-id'] = user.id
        req.headers['user-roles'] = user.roles.join(',')
        return null
      })
      .then(() => next())
      .catch(error => {
        let logEntry = (error.error ? JSON.stringify(error) : 'Unsuccessful user authentication')
        logger.warn(logEntry)
        // Just return 401 as idam returns 400 for bad token.
        error.status = error.status && error.status !== 400 ? error.status : 401
        next(error)
      })
  }
}

module.exports = authCheckerUserOnlyFilter

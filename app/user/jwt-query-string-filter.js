const url = require('url')

const ACCESS_TOKEN = 'jwt'
const SECURITY_COOKIE = '__auth-token'

const jwtQueryStringFilter = (req, res, next) => {
  if (req.query[ACCESS_TOKEN]) {
    if (req.protocol === 'https') { /* SECURE */
      res.cookie(SECURITY_COOKIE, req.query[ACCESS_TOKEN], {secure: true, httpOnly: true})
    } else {
      res.cookie(SECURITY_COOKIE, req.query[ACCESS_TOKEN], {httpOnly: true})
    }
    res.redirect(url.parse(req.url).pathname)
  } else {
    next()
  }
}

module.exports = jwtQueryStringFilter

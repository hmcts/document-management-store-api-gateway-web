'use strict'
const express = require('express')
const path = require('path')
const cors = require('cors')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const validator = require('express-validator')
const {logging} = require('./app/logging/logger')

// routers DM GW & Public Law APP
const healthcheck = require('./app/router/health')
const proxy = require('./app/router/proxy')
const dmErrorHandle = require('./app/router/error')

// Security & JWT Tokens
const helmet = require('helmet')
const corsHandler = require('./app/security/cors')
const jwtQueryStringFilter = require('./app/user/jwt-query-string-filter')
const authCheckerUserOnlyFilter = require('./app/user/auth-checker-user-only-filter')
const serviceFilter = require('./app/service/service-filter')

// Create Express App
let app = express()
// add logger to express
app.use(logging.express.accessLogger())
app.use(cors())
app.use(validator())
app.use(function (req, res, next) {
  for (var item in req.body) {
    req.sanitize(item).escape()
  }
  next()
})

// Setup View Engine
app.set('view engine', 'html')
app.set('views', ['app/views', 'node_modules/govuk_template_jinja/views/layouts'])
require('express-nunjucks')(app, {
  autoescape: true,
  watch: true,
  noCache: false
})

// Middleware to serve static assets
// govuk_frontend_toolkit
app.use('/public', express.static(path.join(__dirname, 'app', 'assets', 'public')))
app.use('/public', express.static(path.join(__dirname, 'node_modules', 'govuk_frontend_toolkit')))
app.use('/public/images/icons', express.static(path.join(__dirname, 'node_modules', 'govuk_frontend_toolkit', 'images')))

// govuk_template_jinja
app.use('/public', express.static(path.join(__dirname, 'node_modules', 'govuk_template_jinja', 'assets')))

// Elements refers to icon folder instead of images folder
app.use(favicon(path.join(__dirname, 'node_modules', 'govuk_template_jinja', 'assets', 'images', 'favicon.ico')))

// setup cookies
app.use(cookieParser())
app.use(helmet())
app.use('/health', healthcheck)

app.use(corsHandler)
app.use(jwtQueryStringFilter)
app.use(authCheckerUserOnlyFilter)
app.use(serviceFilter)

// proxy handler
app.use('/', proxy)

// error handler
app.use(dmErrorHandle)

module.exports = app

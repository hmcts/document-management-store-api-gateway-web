// proxy
const config = require('config')
const proxy = require('express-http-proxy')
const proxyReqOptDecorator = require('./proxy-request-options-decorator')
const userResDecorator = require('./proxy-user-response-decorator')

const dmProxy = proxy(config.get('proxy.em_api'), {
  parseReqBody: false,
  timeout: 25200000,
  proxyReqOptDecorator,
  userResDecorator
})

module.exports = dmProxy

const express = require('express')
const config = require('config')
const router = express.Router()
const { healthcheck, gwHealthcheck, appHealthcheck, appInfo } = require('../health/healthcheck.js')

router.get('/', healthcheck.configure({
  checks: {
    idam: healthcheck.web(config.get('idam.base_url') + '/health'),
    idamService: healthcheck.web(config.get('idam.s2s_url') + '/health'),
    dmStore: appHealthcheck(config.get('proxy.em_api') + '/health'),
    dmStoreBuildInfo: appInfo(config.get('proxy.em_api') + '/info'),
    emApiGateway: healthcheck.raw(() => {
      return gwHealthcheck() ? healthcheck.up() : healthcheck.down()
    })
  },
  buildInfo: {}
}))

module.exports = router

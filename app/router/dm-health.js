const express = require('express')
const config = require('config')
const router = express.Router()
const { healthcheck, emGatewayHealthcheck, dmStoreHealthcheck, dmStoreInfo } = require('../health/dm-healthcheck.js')

router.get('/', healthcheck.configure({
  checks: {
    idam: healthcheck.web(config.get('idam.base_url') + '/health'),
    idamService: healthcheck.web(config.get('idam.s2s_url') + '/health'),
    dmStore: dmStoreHealthcheck(config.get('proxy.em_api') + '/health'),
    dmStoreBuildInfo: dmStoreInfo(config.get('proxy.em_api') + '/info'),
    emApiGateway: healthcheck.raw(() => {
      return emGatewayHealthcheck() ? healthcheck.up() : healthcheck.down()
    })
  },
  buildInfo: {}
}))

module.exports = router

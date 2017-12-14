const checkDefaultEnv = require('../util/envChange')

// Set default Healthcheck variable if not already set
// This looks dodgy, can we not pull these from config and provide defaults there?
checkDefaultEnv('PACKAGES_ENVIRONMENT', 'local')
checkDefaultEnv('PACKAGES_PROJECT', 'document-management-store-api-gateway-web')
checkDefaultEnv('PACKAGES_NAME', 'document-management-store-api-gateway-web')
const healthcheck = require('@hmcts/nodejs-healthcheck')
const dmStoreHealthCallback = require('./dm-store-health-callback')
const dmStoreInfoCallback = require('./dm-store-info-callback')

const emGatewayHealthcheck = () => {
  return true
}

const dmStoreHealthcheck = (url) => {
  return healthcheck.web(url, {
    callback: dmStoreHealthCallback,
    timeout: 5000,
    deadline: 10000
  })
}

const dmStoreInfo = (url) => {
  return healthcheck.web(url, {
    callback: dmStoreInfoCallback,
    timeout: 5000,
    deadline: 10000
  })
}

module.exports = {
  healthcheck: healthcheck,
  emGatewayHealthcheck: emGatewayHealthcheck,
  dmStoreHealthcheck: dmStoreHealthcheck,
  dmStoreInfo: dmStoreInfo
}

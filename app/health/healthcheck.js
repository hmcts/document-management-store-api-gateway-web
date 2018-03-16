const checkDefaultEnv = require('../util/envChange')

// Set default Healthcheck variable if not already set
// This looks dodgy, can we not pull these from config and provide defaults there?
checkDefaultEnv('PACKAGES_ENVIRONMENT', 'local')
checkDefaultEnv('PACKAGES_PROJECT', 'dm-api-gw-web')
checkDefaultEnv('PACKAGES_NAME', 'dm-api-gw-web')
const healthcheck = require('@hmcts/nodejs-healthcheck')
const healthCallback = require('./health-callback')
const infoCallback = require('./info-callback')

const gwHealthcheck = () => {
  return true
}

const appHealthcheck = (url) => {
  return healthcheck.web(url, {
    callback: healthCallback,
    timeout: 5000,
    deadline: 10000
  })
}

const appInfo = (url) => {
  return healthcheck.web(url, {
    callback: infoCallback,
    timeout: 5000,
    deadline: 10000
  })
}

module.exports = {
  healthcheck: healthcheck,
  gwHealthcheck: gwHealthcheck,
  appHealthcheck: appHealthcheck,
  appInfo: appInfo
}

const _ = require('lodash')
const healthcheck = require('@hmcts/nodejs-healthcheck')

module.exports = (err, res) => {
  if (!err && _.get(res, 'body.buildInfo')) {
    return healthcheck.up(res.body.buildInfo)
  }
  return healthcheck.down()
}

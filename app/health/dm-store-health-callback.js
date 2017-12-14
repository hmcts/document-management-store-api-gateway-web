const _ = require('lodash')
const healthcheck = require('@hmcts/nodejs-healthcheck')

module.exports = (err, res) => {
  if (!err && _.get(res, 'body.status') === 'UP') {
    return healthcheck.up(res.body)
  } else {
    if (_.get(res, 'body')) {
      return healthcheck.down(res.body)
    }
  }
  return healthcheck.down()
}

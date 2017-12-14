// proxy
const config = require('config')

module.exports = function (proxyReqOpts, srcReq) {
  if (config.get('xfwd')) {
    proxyReqOpts.headers['X-Forwarded-Host'] = srcReq.headers['host']
  }
  if (srcReq.headers['accept'] === 'text/html') {
    delete proxyReqOpts.headers['accept']
  }
  return proxyReqOpts
}

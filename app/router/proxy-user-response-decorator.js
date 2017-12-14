module.exports = function (proxyRes, proxyResData, userReq) {
  if (proxyRes.statusCode >= 400 && userReq.headers['accept'] === 'text/html') {
    const err = new Error()
    err.error = proxyRes.statusText
    err.status = proxyRes.statusCode
    return Promise.reject(err)
  } else {
    return proxyResData
  }
}

const extract = (request) => {
  const pattern = /^\/[^\/]+\/[^\/]+\/([^\/]+)\/.+$/ // eslint-disable-line no-useless-escape
  const match = request.originalUrl.match(pattern) || []

  return match[1]
}

exports.extract = extract

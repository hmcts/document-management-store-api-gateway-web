const extract = (request) => {
  const pattern = /^\/[^\/]+\/([^\/]+)\/[^\/]+\/(?:jurisdictions?\/([^\/]+)\/)?.+$/ // eslint-disable-line no-useless-escape
  const match = request.originalUrl.match(pattern) || []

  if (match[1]) {
    const userGroup = match[1]
      .toLowerCase() // Roles are lowercase
      .replace(/s$/, '') // Roles are singular, url resources is plural

    if (match[2]) {
      const jurisdiction = match[2].toLowerCase()

      return [`${userGroup}-${jurisdiction}`]
    }

    return [`${userGroup}`]
  }

  return []
}

exports.extract = extract

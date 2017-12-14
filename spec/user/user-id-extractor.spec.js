const chai = require('chai')
const expect = chai.expect

const userIdExtractor = require('../../app/user/user-id-extractor')
var http = require('http')

describe('User ID extractor', () => {
  describe('extract()', () => {
    it('should extract ID from URL', () => {
      let request = Object.create(http.IncomingMessage.prototype)
      request.originalUrl = '/data/caseworker/5/TEST/case-types/TestAddressBookCase/cases/7'

      let userId = userIdExtractor.extract(request)

      expect(userId).to.equal('5')
    })

    it('should return null if ID cannot be extracted from URL', () => {
      let request = Object.create(http.IncomingMessage.prototype)
      request.originalUrl = '/data/caseworker/'

      let userId = userIdExtractor.extract(request)

      expect(userId).to.be.undefined
    })
  })
})

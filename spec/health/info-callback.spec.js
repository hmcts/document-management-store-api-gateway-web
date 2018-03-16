const chai = require('chai')
const expect = chai.expect

const callback = require('../../app/health/info-callback')

describe('dm-store-info-callback', () => {
  let err, res, callbackResponse

  describe('when response body has buildInfo', () => {
    beforeEach(() => {
      res = {
        body: {
          buildInfo: {
            commit: '12345'
          }
        }
      }
      callbackResponse = callback(err, res)
    })

    it('should return up with the body', () => {
      expect(callbackResponse.commit).to.equal('12345')
    })
  })

  describe('when response body has no buildInfo', () => {
    beforeEach(() => {
      res = {
        body: {}
      }
      callbackResponse = callback(err, res)
    })

    it('should return down', () => {
      expect(callbackResponse.status).to.equal('DOWN')
    })
  })

  describe('when response body is undefined', () => {
    beforeEach(() => {
      res = {}
      callbackResponse = callback(err, res)
    })

    it('should return down', () => {
      expect(callbackResponse.status).to.equal('DOWN')
    })
  })

  describe('when response is undefined', () => {
    beforeEach(() => {
      callbackResponse = callback(err, res)
    })

    it('should return down', () => {
      expect(callbackResponse.status).to.equal('DOWN')
    })
  })

  describe('when there is an error', () => {
    beforeEach(() => {
      err = 'Broken!'
      res = {
        body: {}
      }
      callbackResponse = callback(err, res)
    })

    it('should return down', () => {
      expect(callbackResponse.status).to.equal('DOWN')
    })
  })
})

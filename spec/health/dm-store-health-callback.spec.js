const chai = require('chai')
const expect = chai.expect

const callback = require('../../app/health/dm-store-health-callback')

describe('dm-store-health-callback', () => {
  let err, res, callbackResponse

  describe('when response body status is UP', () => {
    beforeEach(() => {
      res = {
        body: {
          status: 'UP'
        }
      }
      callbackResponse = callback(err, res)
    })

    it('should return up with the body', () => {
      expect(callbackResponse.status).to.equal('UP')
    })
  })

  describe('when response body status is DOWN', () => {
    beforeEach(() => {
      res = {
        body: {
          status: 'DOWN'
        }
      }
      callbackResponse = callback(err, res)
    })

    it('should return down with the body', () => {
      expect(callbackResponse.status).to.equal('DOWN')
    })
  })

  describe('when response has no body', () => {
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

const chai = require('chai')
const expect = chai.expect

const healthCheck = require('../../app/health/healthcheck')

describe('dm-healthcheck', () => {
  describe('when we call the gateway health check', () => {
    let gatewayHealth

    beforeEach(() => {
      gatewayHealth = healthCheck.gwHealthcheck()
    })

    it('should be true', () => {
      expect(gatewayHealth).to.equal(true)
    })
  })
})

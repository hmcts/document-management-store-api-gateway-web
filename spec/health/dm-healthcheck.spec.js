const chai = require('chai')
const expect = chai.expect

const healthCheck = require('../../app/health/dm-healthcheck')

describe('dm-healthcheck', () => {
  describe('when we call the gateway health check', () => {
    let gatewayHealth

    beforeEach(() => {
      gatewayHealth = healthCheck.emGatewayHealthcheck()
    })

    it('should be true', () => {
      expect(gatewayHealth).to.equal(true)
    })
  })
})

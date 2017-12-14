const proxyquire = require('proxyquire')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

describe('ServiceFilter', () => {
  let serviceFilter,
    serviceTokenGenerator,
    req,
    res

  beforeEach(() => {
    req = {
      headers: {}
    }
    res = {}

    serviceTokenGenerator = sinon.stub()

    serviceFilter = proxyquire('../../app/service/service-filter', {
      './service-token-generator': serviceTokenGenerator
    })
  })

  it('add the service token as a header', () => {
    serviceTokenGenerator.returns(Promise.resolve('token'))
    serviceFilter(req, res, () => {
      expect(req.headers.ServiceAuthorization = 'token')
    })
  })

  it('add error status if problems generating token', () => {
    serviceTokenGenerator.returns(Promise.reject({status: 403})) // eslint-disable-line prefer-promise-reject-errors
    serviceFilter(req, res, (err) => {
      expect(err.status = 403)
    })
  })
})

const proxyquire = require('proxyquire')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

describe('ServiceTokenGenerator', () => {
  let fetch

  let serviceTokenGenerator

  beforeEach(() => {
    fetch = sinon.stub()

    serviceTokenGenerator = proxyquire('../../app/service/service-token-generator', {
      '../util/fetch': fetch
    })
  })

  it('should generate a token', () => {
    const encodedToken = 'eyJhbGciOiJIUzI1NiJ9.eyJleHAiOiIxMjM0NTY3ODkwIn0.hv-j-ab0bWQWoLgKp7Avq3GAHbQ54qNDM63FkgQOmaM'
    fetch.returns(Promise.resolve({text: () => encodedToken}))
    serviceTokenGenerator()
      .then(token => expect(token).to.equal(encodedToken))
      .catch(err => console.log(err))
  })

  it('should log error', () => {
    fetch.returns(Promise.reject(new Error({
      statusText: 'Bad request',
      status: 400,
      url: 'localhost:idam'
    })))
    serviceTokenGenerator()
  })
})

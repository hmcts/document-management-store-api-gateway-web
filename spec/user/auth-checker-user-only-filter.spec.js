const proxyquire = require('proxyquire')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

describe('User Resolver', () => {
  let filter,
    userRequestAuthorizer

  beforeEach(() => {
      userRequestAuthorizer = {
          authorise: sinon.stub()
      }

      filter = proxyquire('../../app/user/auth-checker-user-only-filter', {
      './user-request-authorizer': userRequestAuthorizer
    })
  })

  it('should add user to req', (done) => {
      const req = {originalUrl: '/documents'}
      const res = {}
      const next = () => {
        expect(req.authentication.user).to.equal('12345')
          done()
      }

      userRequestAuthorizer.authorise.returns(Promise.resolve('12345'))

    filter(req, res, next)
  })

  it('should add 401 status if authentication fails', (done) => {
      const req = {originalUrl: '/documents'}
      const res = {}
      const next = (error) => {
        expect(error.status).to.equal(401)
          done()
      }

      userRequestAuthorizer.authorise.returns(Promise.reject(new Error()))

    filter(req, res, next)
  })
})

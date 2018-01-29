const proxyquire = require('proxyquire')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

describe('Auth Checker User Only Filter', () => {
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
    const req = {originalUrl: '/documents', headers: {}}
    const res = {}
    const user = {id: '12345', roles: []}
    const next = () => {
      expect(req.authentication.user).to.equal(user)
      done()
    }

    userRequestAuthorizer.authorise.returns(Promise.resolve(user))

    filter(req, res, next)
  })

  it('should add userId to req header', (done) => {
    const req = {originalUrl: '/documents', headers: {}}
    const res = {}
    const user = {id: '12345', roles: []}
    const next = () => {
      expect(req.headers['user-id']).to.equal(user.id)
      done()
    }

    userRequestAuthorizer.authorise.returns(Promise.resolve(user))

    filter(req, res, next)
  })

  it('should add roles to req header', (done) => {
    const req = {originalUrl: '/documents', headers: {}}
    const res = {}
    const user = {id: '12345', roles: ['case-worker', 'citizen']}
    const next = () => {
      expect(req.headers['user-roles']).to.equal('case-worker,citizen')
      done()
    }

    userRequestAuthorizer.authorise.returns(Promise.resolve(user))

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

const proxyquire = require('proxyquire')
const chai = require('chai')
const sinon = require('sinon')
const expect = chai.expect
const sinonChai = require('sinon-chai')
chai.use(sinonChai)

describe('User Resolver', () => {
  let userResolver,
    fetch

  beforeEach(() => {
    fetch = sinon.stub()

    userResolver = proxyquire('../../app/user/user-resolver', {
      '../util/fetch': fetch
    })
  })

  it('should get user details', () => {
    fetch.returns(Promise.resolve({
      json: () => {
        return {success: true}
      }
    }))

    userResolver.getTokenDetails('token')
      .then((res) => {
        expect(res.success).to.equal(true)
      })
      .catch(err => console.log(err))
  })
})

const chai = require('chai')
const expect = chai.expect

const jwtStringFilter = require('../../app/user/jwt-query-string-filter')

describe('JWT String Filter', () => {
  it('should skip filter if no access token present', (done) => {
    const req = {
      query: {}
    }
    const res = {}
    const next = () => {
      expect(true).to.equal(true)
      done()
    }
    jwtStringFilter(req, res, next)
  })

  describe('if access token present', () => {
    let req, res, next
    beforeEach(() => {
      req = {
        query: {
          jwt: 'token'
        },
        url: 'localhost:8080/files/1234'
      }

      res = {
        cookie: (cookie, token, options) => {
          res[cookie] = {
            token: token,
            options: options
          }
        }
      }
      next = () => {}
    })

    it('Should set secure cookie if protocol is https ', () => {
      req.protocol = 'https'
      res.redirect = url => {
        expect(url).to.equal('/files/1234')

        expect(res['__auth-token'].token).to.equal('token')
        expect(res['__auth-token'].options.httpOnly).to.equal(true)
        expect(res['__auth-token'].options.secure).to.equal(true)
      }

      jwtStringFilter(req, res, next)
    })

    it('Should set insecure cookie if protocol is not https ', () => {
      req.protocol = 'http'
      res.redirect = url => {
        expect(url).to.equal('/files/1234')

        expect(res['__auth-token'].token).to.equal('token')
        expect(res['__auth-token'].options.httpOnly).to.equal(true)
        expect(res['__auth-token'].options.secure).to.be.undefined
      }

      jwtStringFilter(req, res, next)
    })
  })
})

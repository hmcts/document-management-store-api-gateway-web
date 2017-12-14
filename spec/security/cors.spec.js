const chai = require('chai')
const expect = chai.expect
const proxyquire = require('proxyquire')

describe('CORs', () => {
  let cors, req, res, config

  beforeEach(() => {
    config = require('config')

    cors = proxyquire('../../app/security/cors', {
      'config': config
    })

    req = {
      get: prop => {
        return req[prop]
      },
      origin: '',
      method: ''
    }

    res = {
      set: (prop, value) => {
        res[prop] = value
      },
      get: prop => res[prop]
    }
  })

  it('should set Access-Control-Allow-Credentials to true', () => {
    cors(req, res, () => {
      expect(res.get('Access-Control-Allow-Credentials')).to.equal(true)
    })
  })

  it('should set Access-Control-Allow-Methods from config', () => {
    cors(req, res, () => {
      expect(res.get('Access-Control-Allow-Methods')).to.equal('GET,POST,PUT,DELETE,OPTIONS')
    })
  })
})

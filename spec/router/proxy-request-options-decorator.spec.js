const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
const proxyquire = require('proxyquire')
var sinonChai = require('sinon-chai')

chai.should()
chai.use(sinonChai)

describe('proxy-request-options-decorator', () => {
  let requestOpts, srcReq, config, decorator

  beforeEach(() => {
    requestOpts = {
      headers: {}
    }
    srcReq = {
      headers: {
        host: 'https://my-fantastic-host'
      }
    }
    config = {
      get: sinon.stub()
    }
    decorator = proxyquire('../../app/router/proxy-request-options-decorator', {
      'config': config
    })
  })

  describe('when xfwd is enabled', () => {
    beforeEach(() => {
      config.get.returns(true)
      decorator(requestOpts, srcReq)
    })

    it('should set the X Forwarded Header', () => {
      expect(requestOpts.headers['X-Forwarded-Host']).to.equal(srcReq.headers.host)
    })
  })

  describe('when xfwd is not enabled', () => {
    beforeEach(() => {
      config.get.returns(false)
      decorator(requestOpts, srcReq)
    })

    it('should not set the X Forwarded Header', () => {
      expect(requestOpts.headers['X-Forwarded-Host']).to.be.undefined
    })
  })

  describe('when source request accept header is text/html', () => {
    beforeEach(() => {
      requestOpts.headers.accept = 'text/html'
      srcReq.headers.accept = 'text/html'
      decorator(requestOpts, srcReq)
    })

    it('should delete the proxy request accept header', () => {
      expect(requestOpts.headers.accept).to.be.undefined
    })
  })

  describe('when source request accept header is not text/html', () => {
    beforeEach(() => {
      requestOpts.headers.accept = 'application/json'
      srcReq.headers.accept = 'application/json'
      decorator(requestOpts, srcReq)
    })

    it('should delete the proxy request accept header', () => {
      expect(requestOpts.headers.accept).to.equal('application/json')
    })
  })
})

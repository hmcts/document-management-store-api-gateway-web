const chai = require('chai')
const expect = chai.expect

const decorator = require('../../app/router/proxy-user-response-decorator')

describe('proxy-user-request-decorator', () => {
  let proxyRes, proxyResData, userReq, userRes, decoratorResponse

  beforeEach(() => {
    proxyRes = {}
    userReq = {
      headers: {}
    }
    proxyResData = "It's good!"
  })

  describe('when the request accept header is text/html', () => {
    beforeEach(() => {
      proxyRes.statusText = 'Bork!'
      userReq.headers.accept = 'text/html'
    })

    describe('when proxy response is 400', () => {
      beforeEach(() => {
        proxyRes.statusCode = 400
        decoratorResponse = decorator(proxyRes, proxyResData, userReq, userRes)
      })

      it('should reject a promise', done => {
        decoratorResponse.catch((err) => {
          expect(err.status).to.equal(400)
          expect(err.error).to.equal('Bork!')
          done()
        })
      })
    })

    describe('when proxy response is over 400', () => {
      beforeEach(() => {
        proxyRes.statusCode = 402
        decoratorResponse = decorator(proxyRes, proxyResData, userReq, userRes)
      })
      it('should reject a promise', done => {
        decoratorResponse.catch((err) => {
          expect(err.status).to.equal(402)
          expect(err.error).to.equal('Bork!')
          done()
        })
      })
    })

    describe('when the request accept header is not text/html', () => {
      beforeEach(() => {
        userReq.headers.accept = 'application/json'
      })

      describe('when proxy response status is 400', () => {
        beforeEach(() => {
          proxyRes.statusCode = 400
          decoratorResponse = decorator(proxyRes, proxyResData, userReq, userRes)
        })

        it('should just return the proxy response data', () => {
          expect(decoratorResponse).to.equal(proxyResData)
        })
      })

      describe('when proxy response status is more than 400', () => {
        beforeEach(() => {
          proxyRes.statusCode = 402
          decoratorResponse = decorator(proxyRes, proxyResData, userReq, userRes)
        })

        it('should just return the proxy response data', () => {
          expect(decoratorResponse).to.equal(proxyResData)
        })
      })

      describe('when proxy response status is less than 400', () => {
        beforeEach(() => {
          proxyRes.statusCode = 201
          decoratorResponse = decorator(proxyRes, proxyResData, userReq, userRes)
        })

        it('should just return the proxy response data', () => {
          expect(decoratorResponse).to.equal(proxyResData)
        })
      })
    })
  })
})

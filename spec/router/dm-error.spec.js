const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
var sinonChai = require('sinon-chai')
chai.should()
chai.use(sinonChai)

const errorHandler = require('../../app/router/dm-error')

describe('dm error', () => {
  let err, req, res, format, contentType

  beforeEach(() => {
    err = {}
    res = {
      status: sinon.spy(),
      render: sinon.spy(),
      json: sinon.spy(),
      format: toFormat => {
        format = toFormat
        return null
      },
      contentType: aContentType => {
        contentType = aContentType
      },
      locals: {}
    }
  })

  describe('When the error status is not a number', () => {
    beforeEach(() => {
      err.status = 'Broken!'
      errorHandler(err, req, res)
    })

    it('should set status to 500 ', () => {
      res.status.should.have.been.calledWith(500)
    })
  })

  describe('When the error status is 500', () => {
    beforeEach(() => {
      err.status = 500
      errorHandler(err, req, res)
    })

    it('should set status to 500 ', () => {
      res.status.should.have.been.calledWith(500)
    })

    it('should set the error to Internal Server Error', () => {
      expect(err.statusText).to.equal('Internal Server Error')
    })

    describe('when the content type is text/html', () => {
      beforeEach(() => {
        format['text/html']()
      })

      it('should call render with the error', () => {
        res.render.should.have.been.calledWith('errors/error', err)
      })

      it('should not call json with the error', () => {
        res.json.should.not.have.been.called
      })
    })

    describe('when the content type is not text/html', () => {
      beforeEach(() => {
        format['*/*']()
      })

      it('should call json with the error', () => {
        res.json.should.have.been.calledWith(err)
      })

      it('should not call render', () => {
        res.render.should.not.have.been.called
      })

      it('should have a content tpe of application/json', () => {
        expect(contentType).to.equal('application/json')
      })
    })

    describe('when the content type is not text/html', () => {
      beforeEach(() => {
        format.default()
      })

      it('should call json with the error', () => {
        res.json.should.have.been.calledWith(err)
      })

      it('should not call render', () => {
        res.render.should.not.have.been.called
      })

      it('should have a content type of application/json', () => {
        expect(contentType).to.equal('application/json')
      })
    })
  })
})

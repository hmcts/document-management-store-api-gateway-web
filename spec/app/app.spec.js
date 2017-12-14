const chai = require('chai')
const expect = chai.expect

const app = require('../../app')

describe('app', () => {
  // Basically just make sure everything imports OK as there is no logic
  it('should have imported properly', () => {
    expect(app).to.not.equal(undefined)
  })
})

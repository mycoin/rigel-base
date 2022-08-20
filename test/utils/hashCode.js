const { assert } = require('chai')
const { utils } = require('../..')

it('utils.hashCode(string)', () => {
  assert.equal(utils.hashCode('Hello world'), 150978191)
})

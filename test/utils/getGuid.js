const { assert } = require('chai')
const { utils } = require('../..')

it('utils.getGuid(type)', () => {
  assert(utils.getGuid('uuid').startsWith('uuid'))
  assert.equal(utils.getGuid(true).length, 36)
  assert.notEqual(utils.getGuid(), utils.getGuid())
})

const { assert } = require('chai')
const { utils } = require('../..')

it('utils.getGuid(type)', () => {
  assert(utils.getGuid('uuid').startsWith('uuid'))
  assert.equal(utils.getGuid(7).length, 7)
  assert.equal(utils.getGuid(true).length, 36)
  assert.notEqual(utils.getGuid(2), utils.getGuid(2))
  assert.notEqual(utils.getGuid(), utils.getGuid())
})

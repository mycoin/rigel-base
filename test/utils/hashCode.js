const { assert } = require('chai')
const { utils } = require('../..')

it('utils.hashCode(string)', () => {
  assert.equal(utils.hashCode('阿里巴巴'), 10378653531092)
  assert.equal(utils.hashCode('Hello world'), 10719102957959)
})

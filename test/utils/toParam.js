const { assert } = require('chai')
const { utils } = require('../..')

it('utils.toParam(params)', () => {
  const param = {
    id: 100001,
    name: '阿里',
    debugMode: null,
  }
  assert.equal(utils.toParam(param), 'id=100001&name=%E9%98%BF%E9%87%8C')
  assert.equal(utils.toParam(param, { encode: false }), 'id=100001&name=阿里')
})

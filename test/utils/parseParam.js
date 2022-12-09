const { assert } = require('chai')
const { utils } = require('../..')

it('utils.parseParam(queryString)', () => {
  const queryString = 'q=success&id=100001&name=%E9%98%BF%E9%87%8C&bi=9007199254740992'
  const params = {
    q: 'success',
    id: 100001,
    name: '阿里',
    bi: '9007199254740992',
  }
  assert.deepEqual(utils.parseParam(queryString), params)
  assert.deepEqual(utils.parseParam('?' + queryString), params)
})

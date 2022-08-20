const { assert } = require('chai')
const { utils } = require('../..')

it('utils.parseParam(queryString)', () => {
  const queryString = 'q=success&id=100001&name=%E9%98%BF%E9%87%8C'
  const params = {
    q: 'success',
    id: 100001,
    name: '阿里',
  }
  assert.deepEqual(utils.parseParam(queryString), params)
  assert.deepEqual(utils.parseParam('?' + queryString), params)
})

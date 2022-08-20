const { assert } = require('chai')
const { utils } = require('../..')

it('utils.toUrl(url, queryParams, options)', () => {
  const url = 'https://www.1688.com/s?q=success'
  const params = {
    id: 100001,
    name: '阿里',
    debugMode: null,
  }

  assert.equal(utils.toUrl(), '')
  assert.equal(utils.toUrl(url, params), 'https://www.1688.com/s?q=success&id=100001&name=%E9%98%BF%E9%87%8C')
})

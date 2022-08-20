const { assert } = require('chai')
const { utils } = require('../..')

it('utils.parseUrl(content)', () => {
  const url = '?param=123&param=true&param#hash'
  const result = utils.parseUrl(url)

  assert.equal(result.url, '')
  assert.equal(result.fragmentIdentifier, 'hash')
  assert.deepEqual(result.query, {
    param: [123, true, null],
  })
})

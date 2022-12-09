const { assert } = require('chai')
const { utils } = require('../..')

it('utils.parseUrl(content)', () => {
  const url = '?param=123&param=true&param&param=9007199254740992#hash'
  const result = utils.parseUrl(url)

  assert.equal(result.url, '')
  assert.equal(result.fragmentIdentifier, 'hash')
  assert.deepEqual(result.query, {
    param: [123, true, null, '9007199254740992'],
  })
})

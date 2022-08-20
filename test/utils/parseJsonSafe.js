const { assert } = require('chai')
const { utils } = require('../..')

it('utils.parseJsonSafe(contentString, defaultValue)', () => {
  const json = {
    count: 1,
    prev: 'value',
    prevObject: {
      time: Date.now(),
    },
  }
  const content = JSON.stringify(json)

  assert.deepEqual(utils.parseJsonSafe(content), json)
  assert.deepEqual(utils.parseJsonSafe('NaN', json), json)
})

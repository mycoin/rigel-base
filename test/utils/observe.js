const { assert } = require('chai')
const { utils } = require('../..')

it('utils.observe(object, keyName, callback)', () => {
  const temp = { count: 0 }
  const object = {
    keyName: 'value',
    value: 1,
  }
  utils.observe(object, 'keyName', (prev, next) => {
    temp.prev = prev
    temp.next = next
    temp.count++
  })

  object.keyName = 'nextValue'
  object.keyName = 'nextValue'
  object.keyName = 'nextValue'

  assert.deepEqual(temp, { prev: 'value', next: 'nextValue', count: 1 })
  assert.deepEqual(object.keyName, 'nextValue')
})

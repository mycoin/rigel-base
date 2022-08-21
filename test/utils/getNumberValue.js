const { assert } = require('chai')
const { utils } = require('../..')

it('utils.getNumberValue(value, options)', () => {
  assert.equal(utils.getNumberValue(), undefined)
  assert.equal(utils.getNumberValue('1'), 1)

  assert.equal(
    0.33,
    utils.getNumberValue(1 / 3, {
      precision: 2,
    }),
  )
  assert.equal(
    0.67,
    utils.getNumberValue(2 / 3, {
      precision: 2,
    }),
  )
})

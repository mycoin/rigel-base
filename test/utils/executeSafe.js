const { assert } = require('chai')
const { utils } = require('../..')

it('utils.executeSafe(fn, defaultValue)', () => {
  const returnTrue = () => true
  const returnFalse = () => false
  const returnErr = () => {
    throw new Error('internalError')
  }

  assert.equal(utils.executeSafe(), undefined)
  assert.equal(utils.executeSafe(returnTrue), true)
  assert.equal(utils.executeSafe(returnFalse), false)
  assert.equal(utils.executeSafe(returnErr), undefined)
  assert.equal(utils.executeSafe(returnErr, 'value'), 'value')
})

const { assert } = require('chai')
const { utils } = require('../..')

it('utils.classNames(className, className)', () => {
  assert.equal(utils.classNames(), '')
  assert.equal(utils.classNames('status', 'success'), 'status success')
  assert.equal(utils.classNames('status', { success: true }), 'status success')
  assert.equal(utils.classNames('status', { success: false }), 'status')
})

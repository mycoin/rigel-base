const { assert } = require('chai')
const { utils } = require('../..')

describe('utils.formatDate(date, format)', () => {
  const date = new Date(1671753644440)
  it('should be right format', () => {
    assert.equal(utils.formatDate(date, 'YYYY-MM-dd'), '2022-12-23')
    assert.equal(utils.formatDate(date, 'HH:ii:ss'), '08:00:44')
    assert.equal(utils.formatDate(date, 'HH:mm:ss'), '08:00:44')
    assert.equal(utils.formatDate(date, 'short'), '2022-12-23')
    assert.equal(utils.formatDate(date, 'long'), '2022-12-23 08:00:44')
  })
})

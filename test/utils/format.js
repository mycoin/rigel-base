const { assert } = require('chai')
const { utils } = require('../..')

describe('utils.format(stringTpl, dataMap)', () => {
  const dataMap = {
    word: '阿里巴巴',
    name: '<em>X</em>',
  }
  it('should escape html entity', () => {
    assert.equal(utils.format('{name}', dataMap), '&lt;em&gt;X&lt;/em&gt;')
  })
  it('should encodeUrl', () => {
    assert.equal(utils.format('{:word}', dataMap), '%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4')
  })
  it('should return raw content', () => {
    assert.equal(utils.format('{=word}', dataMap), dataMap.word)
    assert.equal(utils.format('{=name}', dataMap), dataMap.name)
  })
  it('should replace well', () => {
    const normal = '<a href="wd={:word}">{name}</a>'
    assert.equal(
      utils.format(normal, dataMap),
      '<a href="wd=%E9%98%BF%E9%87%8C%E5%B7%B4%E5%B7%B4">&lt;em&gt;X&lt;/em&gt;</a>',
    )
  })
})

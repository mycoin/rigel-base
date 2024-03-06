/* eslint-disable max-len */
const { assert } = require('chai')
const { utils } = require('../..')

it('utils.hashEncode(string)', () => {
  assert.equal(utils.hashEncode('阿里巴巴'), '2WILqwKg')
  assert.equal(utils.hashEncode('Hello world'), '32InBCWr')
  assert.equal(
    utils.hashEncode(
      'https://www.ibm.com/products/watsonx-ai?utm_source=skills_network&utm_content=in_lab_content_link&utm_id=Lab-441&cm_sp=ibmdev-_-developer-articles-_-product',
    ),
    '1C6phVBE',
  )
})

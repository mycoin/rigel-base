const { assert } = require('chai')
const { utils } = require('../..')

it('utils.isMatches(Regex, string)', () => {
  assert(utils.isMatches(/X/, 'X'))

  assert(!utils.isMatches(/XXX/, 'X'))
  assert(!utils.isMatches(/XXX/, null))
  assert(!utils.isMatches(/XXX/, undefined))
  assert(!utils.isMatches([1, 2, 3], 4))

  assert(utils.isMatches([1, 2, 3], 2))
  assert(utils.isMatches(function () {
    return true
  }, 4))
})

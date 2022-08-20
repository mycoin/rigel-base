const assert = require('assert')
const { Deferred } = require('..')

describe('Deferred: ', () => {
  const deferred = new Deferred()

  it('Deferred extends Promise', () => {
    assert(deferred instanceof Promise)
  })
  it('Deferred resolve and reject', () => {
    assert(typeof deferred.resolve === 'function')
    assert(typeof deferred.reject === 'function')
  })
  it('jQuery Deferred like', () => {
    assert(typeof deferred.done === 'function')
    assert(typeof deferred.fail === 'function')
  })
})

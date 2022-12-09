const assert = require('assert')
const { Deferred } = require('..')

describe('Deferred: ', () => {
  const deferred = new Deferred()

  deferred.then()
  deferred.catch((error) => {
    assert(error instanceof Error)
  })
  deferred.resolve(2)
  deferred.reject(new Error())

  it('Deferred resolve and reject', () => {
    assert(typeof deferred.resolve === 'function')
    assert(typeof deferred.reject === 'function')
  })

  it('jQuery Deferred like', () => {
    assert(typeof deferred.done === 'function')
    assert(typeof deferred.always === 'function')
    assert(typeof deferred.fail === 'function')
  })
})

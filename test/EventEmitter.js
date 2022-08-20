const assert = require('assert')
const { EventEmitter } = require('..')

describe('EventEmitter: ', () => {
  const eventEmitter = new EventEmitter()
  it('EventEmitter type', () => {
    assert(typeof eventEmitter.on === 'function')
    assert(typeof eventEmitter.once === 'function')
    assert(typeof eventEmitter.off === 'function')
    assert(typeof eventEmitter.emit === 'function')
    assert(typeof eventEmitter.listenerCount === 'function')
    assert(typeof eventEmitter.getMaxListeners === 'function')
    assert(typeof eventEmitter.setMaxListeners === 'function')
  })
})

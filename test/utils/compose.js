const { assert } = require('chai')
const { utils } = require('../..')

describe('utils.compose(...funcs)', () => {
  it('should always return a function', () => {
    const result = utils.compose()
    assert(typeof result === 'function')
  })
  it('should throw any error if you pass some param that is not a function', () => {
    let error = null
    try {
      utils.compose({})
    } catch (e) {
      error = e
    }
    assert(error instanceof Error)
    assert(error.message === 'One of the params of compose is not a function')
  })

  it('should return undefined on the second call if any params was given', () => {
    const result = utils.compose()()
    assert(result === undefined)
  })
  it('should execute the received functions', () => {
    let num = 1
    function fn1() {
      num += 1
    }
    utils.compose(fn1)()
    assert(num === 2)
  })

  it('should receive and execute as many function as the user wants', () => {
    let num = 1
    function fn1() {
      num += 1
    }
    function fn2() {
      num += 1
    }
    function fn3() {
      num += 1
    }
    utils.compose(fn1, fn2, fn3)()
    assert(num === 4)
  })

  it('should execute the last function first, and the first as last', () => {
    let pharse = 'Start with one'
    function fn1() {
      pharse += ' then four.'
    }
    function fn2() {
      pharse += ' then three'
    }
    function fn3() {
      pharse += ' then two'
    }
    utils.compose(fn1, fn2, fn3)()
    assert(pharse === 'Start with one then two then three then four.')
  })

  it('should return what the user want', () => {
    function fn1() {
      return 'foo'
    }
    const result = utils.compose(fn1)()
    assert(result === 'foo')
  })

  it('should pass the return to the next function as argument', () => {
    function fn1(param) {
      return param + ' foo'
    }
    function fn2() {
      return 'bar'
    }
    const result = utils.compose(fn1, fn2)()
    assert(result === 'bar foo')
  })

  it('should accept params on when executed, these params will be passed to the first function', () => {
    function fn1(param) {
      return param + ' Duarte'
    }
    function fn2(str1) {
      return str1
    }
    const result = utils.compose(fn1, fn2)('Emmanuel Kant')
    assert(result === 'Emmanuel Kant Duarte')
  })
  it('should receive only one param in all functions except the on the first one', () => {
    function fn1(param, otherParam) {
      return param + ' Duarte ' + otherParam
    }
    function fn2(str1, str2) {
      return str1 + str2
    }
    const result = utils.compose(fn1, fn2)('My name', ' is Emmanuel Kant')
    assert(result === 'My name is Emmanuel Kant Duarte undefined')
  })
})

const assert = require('assert')
const { Middleware } = require('../..')
const Person = require('./person/Person')
const WalkMiddleware = require('./middlewares/WalkMiddleware')
const { PersonMiddleware1, PersonMiddleware2, PersonMiddleware3 } = require('./middlewares/PersonMiddleware')

describe('Middleware: ', () => {
  let person
  let middlewareManager

  beforeEach(() => {
    person = new Person()
    middlewareManager = new Middleware(person)
  })

  afterEach(() => {
    person = null
    middlewareManager = null
  })

  describe('middleware function: ', () => {
    it('should apply the middlweare function', () => {
      middlewareManager.use('walk', WalkMiddleware)
      const newStep = 3
      person.walk(newStep)
      return assert.equal(person.step, newStep + 1)
    })
  })

  describe('middleware object: ', () => {
    it('should apply the middlweare object', () => {
      middlewareManager.use(PersonMiddleware1)
      const newStep = 3
      person.walk(newStep)
      person.speak('hello')
      assert.equal(person.step, newStep + 1)
      assert(/from middleware/g.test(person.word))
    })
  })

  describe('middlewareMethods: ', () => {
    it('should apply the middlweare object', () => {
      middlewareManager.use(new PersonMiddleware2())
      const newStep = 3
      person.walk(newStep)
      person.speak('hello')
      assert.equal(person.step, newStep + 1)
      assert(/from middleware/g.test(person.word))
    })
  })

  describe('middleware object with private method: ', () => {
    it('should apply the middlweare object', () => {
      middlewareManager.use(new PersonMiddleware3())
      const newStep = 3
      person.walk(newStep)
      person.speak('hello')
      assert.equal(person.step, newStep + 1)
      assert(/from middleware/g.test(person.word))
    })
  })
})

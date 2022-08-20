/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
/* eslint-disable max-classes-per-file */

const PersonMiddleware1 = {
  walk: (target) => (next) => (step) => {
    step += 1
    return next(step)
  },
  speak: (target) => (next) => (word) => {
    word = 'from middleware: ' + word
    return next(word)
  },
}

class PersonMiddleware2 {
  constructor() {
    // Define function names for middleware target.
    this.middlewareMethods = ['walk', 'speak']
  }

  walk(target) {
    return (next) => (step) => {
      step += 1
      return next(step)
    }
  }

  speak(target) {
    return (next) => (word) => {
      word = 'from middleware: ' + word
      return next(word)
    }
  }
}

class PersonMiddleware3 {
  // Prefix/Postfix method name by an underscore will ignore
  _getWord(word) {
    return 'from middleware: ' + word
  }

  walk(target) {
    return (next) => (step) => {
      step += 1
      return next(step)
    }
  }

  speak(target) {
    return (next) => (word) => {
      word = this._getWord()
      return next(word)
    }
  }
}

module.exports = {
  PersonMiddleware1,
  PersonMiddleware2,
  PersonMiddleware3,
}

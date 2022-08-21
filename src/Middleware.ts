import compose from './utils/compose'

const middlewareManagerHash: Middleware[] = []

/**
 * Manage middlewares for an object.
 * Middleware functions are functions that have access to the target function and it's arguments,
 * and the target object and the next middleware function in the target function cycle.
 * The next middleware function is commonly denoted by a variable named next.
 *
 * Middleware functions can perform the following tasks:
 *  - Execute any code.
 *  - Make changes to the function's arguments.
 *  - End the target function.
 *  - Call the next middleware in the stack.
 *
 * If the current middleware function does not end the target function cycle,
 * it must call next() to pass control to the next middleware function. Otherwise,
 * the target function will be left hanging.
 *
 * e.g.
 *  ```
 *  const walk = target => next => (...args) => {
 *     this.log(`walk function start.`);
 *     const result = next(...args);
 *     this.log(`walk function end.`);
 *     return result;
 *   }
 *  ```
 *
 * Middleware object is an object that contains function's name as same as the target object's function name.
 *
 * e.g.
 *  ```
 *  const Logger = {
 *      walk: target => next => (...args) => {
 *        console.log(`walk function start.`);
 *        const result = next(...args);
 *        console.log(`walk function end.`);
 *        return result;
 *      }
 *   }
 *  ```
 *
 * Function's name start or end with "_" will not be able to apply middleware.
 *
 * @example
 *
 * ## Basic
 *
 * We define a Person class.
 * // the target object
 * class Person {
 *   // the target function
 *   walk(step) {
 *     this.step = step;
 *   }
 *
 *   speak(word) {
 *     this.word = word;
 *   }
 * }
 *
 * Then we define a middleware function to print log.
 *
 * // middleware for walk function
 * const logger = target => next => (...args) => {
 *   console.log(`walk start, steps: ${args[0]}.`);
 *   const result = next(...args);
 *   console.log(`walk end.`);
 *   return result;
 * }
 *
 * Now we apply the log function as a middleware to a Person instance.
 *
 * // apply middleware to target object
 * const p = new Person();
 * const middlewareManager = new Middleware(p);
 * middlewareManager.use('walk', logger);
 * p.walk(3);
 *
 * Whenever a Person instance call it's walk method, we'll see logs from the looger middleware.
 *
 * ## Middleware object
 * We can also apply a middleware object to a target object.
 * Middleware object is an object that contains function's name as same as the target object's function name.
 *
 * const PersonMiddleware = {
 *   walk: target => next => step => {
 *     console.log(`walk start, steps: step.`);
 *     const result = next(step);
 *     console.log(`walk end.`);
 *     return result;
 *   },
 *   speak: target => next => word => {
 *     word = 'this is a middleware trying to say: ' + word;
 *     return next(word);
 *   }
 * }
 *
 * // apply middleware to target object
 * const p = new Person();
 * const middlewareManager = new Middleware(p);
 * middlewareManager.use(PersonMiddleware);
 * p.walk(3);
 * p.speak('hi');
 *
 * ## middlewareMethods
 * In a class, function's name start or end with "_" will not be able to apply as middleware.
 * Or we can use `middlewareMethods` to define function names for middleware target within a class.
 *
 * class PersonMiddleware {
 *   constructor() {
 *     // Or Define function names for middleware target.
 *     this.middlewareMethods = ['walk', 'speak'];
 *   }
 *   // Function's name start or end with "_" will not be able to apply as middleware.
 *   _getPrefix() {
 *     return 'Middleware log: ';
 *   }
 *   log(text) {
 *     console.log(this._getPrefix() + text);
 *   }
 *   walk(target) {
 *     return next => step => {
 *       this.log(`walk start, steps: step.`);
 *       const result = next(step);
 *       this.log(`walk end.`);
 *       return result;
 *     }
 *   }
 *   speak(target) {
 *     return next => word => {
 *       this.log('this is a middleware trying to say: ' + word);
 *       return next(word);
 *     }
 *   }
 * }
 *
 * // apply middleware to target object
 * const p = new Person();
 * const middlewareManager = new Middleware(p);
 * middlewareManager.use(new PersonMiddleware())
 * p.walk(3);
 * p.speak('hi');
 *
 */
class Middleware {
  public _target: any

  public _methods: any

  public _methodMiddlewares: any

  /**
   * @param {object} target The target object.
   * @param {...object} middlewareObjects Middleware objects.
   * @return {object} this
   */
  constructor(target: any, ...middlewareObjects: any[]) {
    let instance = middlewareManagerHash.find((key) => {
      return key._target === target
    })
    // a target can only has one Middleware instance
    if (instance === undefined) {
      this._target = target
      this._methods = {}
      this._methodMiddlewares = {}
      middlewareManagerHash.push(this)
      instance = this
    }

    // @ts-ignore
    instance.use(...middlewareObjects)

    return instance
  }

  // Function's name start or end with "_" will not be able to apply middleware.
  _methodIsValid(methodName: string) {
    return !/^_+|_+$|constructor/g.test(methodName)
  }

  // Apply middleware to method
  _applyToMethod(methodName: string, ...middlewares: any[]) {
    if (typeof methodName === 'string' && this._methodIsValid(methodName)) {
      const method = this._methods[methodName] || this._target[methodName]
      if (typeof method === 'function') {
        this._methods[methodName] = method
        if (this._methodMiddlewares[methodName] === undefined) {
          this._methodMiddlewares[methodName] = []
        }
        middlewares.forEach(
          (middleware) => typeof middleware === 'function' && this._methodMiddlewares[methodName].push(middleware(this._target)),
        )
        this._target[methodName] = compose(...this._methodMiddlewares[methodName])(method.bind(this._target))
      }
    }
  }

  /**
   * Apply (register) middleware functions to the target function or apply (register) middleware objects.
   * If the first argument is a middleware object, the rest arguments must be middleware objects.
   *
   * @param {string|object} methodName String for target function name, object for a middleware object.
   * @param {...function|...object} middlewares The middleware chain to be applied.
   * @return {object} this
   */
  use(methodName: string, ...middlewares: any[]) {
    if (typeof methodName === 'object') {
      Array.prototype.slice.call(arguments).forEach((arg: any) => {
        // A middleware object can specify target functions within middlewareMethods (Array).
        // e.g. obj.middlewareMethods = ['method1', 'method2'];
        // only method1 and method2 will be the target function.
        typeof arg === 'object'
          && (
            arg.middlewareMethods || (Object.keys(arg).length ? Object.keys(arg) : Object.getOwnPropertyNames(Object.getPrototypeOf(arg)))
          ).forEach((key: string) => {
            typeof arg[key] === 'function' && this._methodIsValid(key) && this._applyToMethod(key, arg[key].bind(arg))
          })
      })
    } else {
      this._applyToMethod(methodName, ...middlewares)
    }

    return this
  }
}

export default Middleware

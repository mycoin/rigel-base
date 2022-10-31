/**
 * jQuery Deferred like Modular and fast Promises/Deferred implementation
 * e.g.
 * ```
 * const deferred = new Deferred() // or Deferred()
 *
 * deferred.then(function(value) {
 *   console.log('resolved value:', value)
 * }).catch(function(error) {
 *   console.log('rejected error:', error)
 * })
 *
 * // later...
 * setTimeout( function(){
 *    deferred.resolve()
 * }, 1500)
 * ```
 * @returns
 */
class Deferred<T = any> extends Promise<T> {
  resolve: (value: T | PromiseLike<T>) => void

  reject: (reason?: Error) => void

  done: (
    onfulfilled?: ((value: T) => T | PromiseLike<T>) | undefined | null,
    onrejected?: ((reason: Error) => T | PromiseLike<T>) | undefined | null,
  ) => Promise<T>

  fail: (onrejected?: ((reason: Error) => T | PromiseLike<T>) | undefined | null) => Promise<T>

  constructor() {
    let innerResolve
    let innerReject
    super((resolve, reject) => {
      innerResolve = resolve
      innerReject = reject
    })

    this.resolve = innerResolve
    this.reject = innerReject

    /* jQuery Deferred like */
    this.done = this.then.bind(this)
    this.fail = this.catch.bind(this)
  }
}

export default Deferred

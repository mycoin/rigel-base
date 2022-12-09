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
type Finally<T> = (onfinally?: (() => void) | undefined | null) => Promise<T>
type Catch<T> = (onrejected?: ((reason: Error) => T | PromiseLike<T>) | undefined | null) => Promise<T>
type Then<T> = (
  onfulfilled?: ((value: T) => T | PromiseLike<T>) | undefined | null,
  onrejected?: ((reason: Error) => T | PromiseLike<T>) | undefined | null,
) => Promise<T>

class Deferred<T = any> {
  public then: Then<T>

  public done: Then<T>

  public catch: Catch<T>

  public fail: Catch<T>

  public finally: Finally<T>

  public always: Finally<T>

  public resolve: (value: T | PromiseLike<T>) => void

  public reject: (reason?: Error) => void

  constructor() {
    const promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })

    this.then = promise.then.bind(promise)
    this.catch = promise.catch.bind(promise)
    this.finally = promise.finally.bind(promise)

    this.done = this.then
    this.fail = this.catch
    this.always = this.finally
  }
}

export default Deferred

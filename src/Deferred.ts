interface DeferredPromise<ValueType> extends Promise<ValueType> {
  resolve(value: ValueType | PromiseLike<ValueType>): void
  reject(reason?: any): void

  done<TResult1 = ValueType, TResult2 = never>(
    onfulfilled?: ((value: ValueType) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): Promise<TResult1 | TResult2>

  /**
   * Attaches a callback for only the rejection of the Promise.
   *
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  fail<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<ValueType | TResult>
}

/**
 * jQuery Deferred like Modular and fast Promises/Deferred implementation
 * e.g.
 * ```
 * const deferred = Deferred() // or new Deferred()
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
const Deferred = (): DeferredPromise<any> => {
  let outResolve = null
  let outReject = null

  // @ts-ignore
  const promise: DeferredPromise<any> = new Promise((resolve, reject) => {
    outResolve = resolve
    outReject = reject
  })

  promise.resolve = outResolve
  promise.reject = outReject

  // jQuery Deferred like
  promise.done = promise.then.bind(promise)
  promise.fail = promise.catch.bind(promise)

  return promise
}

export default Deferred

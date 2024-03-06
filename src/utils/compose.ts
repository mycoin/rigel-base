/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left.
 * ```javascript
 * // For example:
 * compose(f, g, h)
 * // is identical to doing
 * (...args) => f(g(h(...args))).
 * ```
 */
export default (...funcs: Function[]): Function => {
  if (funcs.length === 0) {
    return (arg: any) => arg
  }
  for (let i = 0; i < funcs.length; i++) {
    if (typeof funcs[i] !== 'function') {
      throw new Error('One of the params of compose is not a function')
    }
  }
  if (funcs.length === 1) {
    return funcs[0]
  }

  const last = funcs[funcs.length - 1]
  const rest = funcs.slice(0, -1)
  return (...args: any[]) => rest.reduceRight((composed, f) => f(composed), last(...args))
}

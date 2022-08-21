/**
 * 判断是否符合指定的条件
 *
 * @param {RegExp|Function|Array} handle
 * @param {Any} params
 * @returns
 */
const isMatches = (handle: RegExp | Function | any[], params: any) => {
  if (params === null || params === undefined) {
    return false
  }

  if (handle instanceof RegExp) {
    return handle.test(params)
  } else if (typeof handle === 'function') {
    return handle(params) !== false
  } else if (Array.isArray(handle)) {
    return handle.indexOf(params) > -1
  }

  throw new TypeError('invalid handle.')
}

export default isMatches

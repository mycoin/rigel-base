import hashCode from './hashCode'

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * shorten string with 62 base (0-9a-zA-Z)
 *
 * @public
 *
 * @param {String} object The object to Calculated
 * @return {String} result
 */
export default (object: any): string => {
  const hashNumber = hashCode(object)
  if (hashNumber === 0) {
    return '0'
  }

  let result = ''
  let hashNum = hashNumber

  while (hashNum > 0) {
    result = chars[hashNum % 62] + result
    hashNum = Math.floor(hashNum / 62)
  }
  return result
}

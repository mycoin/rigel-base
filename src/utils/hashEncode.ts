import hashCode from './hashCode'

const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

/**
 * shorten string with 62 base (0-9a-zA-Z)
 *
 * @public
 *
 * @param {String} source The string to Calculated
 * @return {String} result
 */
const hashEncode = (source: string): string => {
  const hashNumber = hashCode(source)
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
export default hashEncode

/* eslint-disable no-bitwise */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/**
 * Calculate the hash for a string.
 *
 * @public
 *
 * @param {String} source The string to Calculated
 * @return {Number} result
 */
const hashCode = (source: string): number => {
  let hash = 1
  let code = 0

  if (source === undefined || source === null) {
    return hash
  }
  for (let i = source.length - 1; i >= 0; i--) {
    code = source.charCodeAt(i)
    hash = (hash << 6 & 268435455) + code + (code << 14)
    code = hash & 266338304
    hash = code !== 0 ? hash ^ code >> 21 : hash
  }
  return hash
}

export default hashCode

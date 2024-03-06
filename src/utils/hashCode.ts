function convertToStr(value: any) {
  return value == null ? '' : value.toString()
}
/**
 * based on string passed, get the integer hash value
 * through bitwise operation (based on spinoff of `DBJ2`
 * with enhancements for reduced collisions)
 */
export default (object: any) => {
  const string = convertToStr(object)

  let index = string.length
  let hashA = 5381
  let hashB = 52711
  let charCode

  while (index--) {
    charCode = string.charCodeAt(index)

    hashA = (hashA * 33) ^ charCode
    hashB = (hashB * 33) ^ charCode
  }
  return (hashA >>> 0) * 4096 + (hashB >>> 0)
}

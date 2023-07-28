/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multi-assign */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
let guidCache = Date.now()
let IDX = 36
let HEX = ''
while (IDX--) HEX += IDX.toString(36)

const getGuid = (param?: string | number): string => {
  if (typeof param === 'number') {
    let str = ''
    let len = Math.abs(param) || 11
    while (len-- > 0) {
      str += HEX[(Math.random() * 36) | 0]
    }
    return str
  } else if (param && typeof param === 'string') {
    return param + --guidCache
  } else {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (code) => {
      const randomCode = (Math.random() * 16) | 0
      const value = code === 'x' ? randomCode : (randomCode & 0x3) | 0x8
      return value.toString(16)
    })
  }
}

export default getGuid

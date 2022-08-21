/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multi-assign */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-bitwise */
/* eslint-disable no-plusplus */
let guidCache = Date.now()

const getGuid = (operator: string | true) => {
  if (operator && typeof operator === 'string') {
    return operator + --guidCache
  } else if (operator === true) {
    return createCache()
  } else {
    return (--guidCache).toString()
  }
}

const createCache = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (code) => {
  const randomCode = (Math.random() * 16) | 0
  const value = code === 'x' ? randomCode : (randomCode & 0x3) | 0x8
  return value.toString(16)
})

export default getGuid

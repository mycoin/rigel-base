import warning from './warning'

const executeSafe = (method: () => any, defaultValue?: any): any => {
  try {
    if (typeof method === 'function') {
      return method()
    }
  } catch (e) {
    warning(e)
  }
  return defaultValue
}

export default executeSafe

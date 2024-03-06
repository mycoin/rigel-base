import warning from './warning'

export default <T = any>(method: () => T, defaultValue?: T): T => {
  try {
    if (typeof method === 'function') {
      return method()
    }
  } catch (e) {
    warning(e)
  }
  return defaultValue
}

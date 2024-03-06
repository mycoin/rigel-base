export default <P = any>(object: any, keyName: string, callback: (prev: P, next: P) => void): void => {
  let prev = object[keyName]

  Object.defineProperty(object, keyName, {
    enumerable: true,
    configurable: true,
    get: () => prev,
    set: (next) => {
      if (next === prev) {
        return
      }
      callback(prev, next)
      prev = next
    },
  })
}

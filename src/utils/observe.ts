type Callback = (prev: any, next: any) => void

const observe = (object: any, keyName: string, callback: Callback): void => {
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

export default observe

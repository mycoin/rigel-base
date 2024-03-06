const toVal = (mix: any) => {
  let k
  let y
  let str = ''
  if (mix) {
    if (typeof mix === 'object') {
      if (Array.isArray(mix)) {
        for (k = 0; k < mix.length; k++) {
          if (mix[k] && (y = toVal(mix[k]))) {
            str && (str += ' ')
            str += y
          }
        }
      } else {
        for (k in mix) {
          if (mix[k] && (y = toVal(k))) {
            str && (str += ' ')
            str += y
          }
        }
      }
    } else if (typeof mix !== 'boolean' && !mix.call) {
      str && (str += ' ')
      str += mix
    }
  }
  return str
}

export default (...args: any[]) => {
  let i = 0
  let x
  let str = ''
  while (i < args.length) {
    if ((x = toVal(args[i++]))) {
      str && (str += ' ')
      str += x
    }
  }
  return str
}

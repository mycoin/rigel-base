interface GetNumberValueOption {
  min?: number
  max?: number
  roundUp?: boolean
  precision?: number
}

const defaultOptions = {
  precision: 0,
  roundUp: true,
}

export default (value: any, opts?: GetNumberValueOption): number | null => {
  const number = parseFloat(value)
  const options = {
    ...defaultOptions,
    ...opts,
  }

  let result = null
  if (isNaN(number)) {
    return null
  } else if (options.roundUp) {
    result = Number(number.toFixed(options.precision))
  }

  // 如果输入的不能转换为数字放弃转换
  if (!result || isNaN(result)) {
    return null
  }

  // 最大值最小值的兼并处理
  result = isNaN(options.min) ? result : Math.max(options.min, result)
  result = isNaN(options.max) ? result : Math.min(options.max, result)

  return result
}

export { GetNumberValueOption }

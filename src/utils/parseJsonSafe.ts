/**
 * 较为安全的JSON解析方法
 *
 * 1. 如果本来就是Object类型直接返回
 * 2. 如果解析失败返回兜底参数
 *
 * @param contentString
 * @param defaultValue
 * @returns
 */
const parseJsonSafe = (contentString: string, defaultValue?: any) => {
  try {
    if (contentString && typeof contentString === 'object') {
      return contentString
    }
    return JSON.parse(contentString) || defaultValue
  } catch (e) {
    return defaultValue
  }
}

export default parseJsonSafe

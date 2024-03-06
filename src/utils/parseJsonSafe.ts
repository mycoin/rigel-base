/**
 *A relatively secure JSON parsing method
 *
 *1 If it is originally an Object type and returns directly
 *2 If parsing fails, return a fallback parameter
 *
 *@ param contentString
 *@ param defaultValue
 *@ returns
 */
export default (contentString: string, defaultValue?: any) => {
  try {
    if (contentString && typeof contentString === 'object') {
      return contentString
    }
    return JSON.parse(contentString) || defaultValue
  } catch (e) {
    return defaultValue
  }
}

/* eslint-disable no-script-url */
/* eslint-disable prefer-template */
import queryString, { StringifyOptions } from 'query-string'
import { defaultOptions } from './toUrl'

interface XStringifyOptions extends StringifyOptions {
  skipNull: boolean
  skipEmptyString: boolean
  sort: false
}

/**
 * Stringify an object into a query string without sort the keys.
 */
const toParam = (queryParams: Record<string, any>, options?: XStringifyOptions): string => {
  return queryString.stringify(queryParams, {
    ...defaultOptions,
    ...options,
  })
}

export default toParam
export { XStringifyOptions }

import queryString, { StringifyOptions } from 'query-string'

interface XStringifyOptions extends StringifyOptions {
  fragmentIdentifier?: string
  sort?: false
}

const defaultOptions: Partial<XStringifyOptions> = {
  skipNull: true,
  skipEmptyString: true,
  sort: false,
}

/**
 * Stringify an object into a query string without sort the keys.
 */
export default (queryParams: Record<string, any>, options?: XStringifyOptions) => {
  return queryString.stringify(queryParams, {
    ...defaultOptions,
    ...options,
  })
}

export { defaultOptions, XStringifyOptions }

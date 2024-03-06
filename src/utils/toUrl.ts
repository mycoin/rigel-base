import queryString, { StringifiableRecord, UrlObject } from 'query-string'
import { defaultOptions, XStringifyOptions } from './toParam'

const toUrl = (url: string, queryParams: StringifiableRecord, options?: XStringifyOptions): string => {
  const { fragmentIdentifier, ...otherOptions } = {
    ...defaultOptions,
    ...options,
  }
  const urlObject: UrlObject = {
    url: url || '',
    query: queryParams,
    fragmentIdentifier,
  }
  return queryString.stringifyUrl(urlObject, otherOptions)
}

export default toUrl

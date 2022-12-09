/* eslint-disable no-script-url */
/* eslint-disable prefer-template */
import queryString, { StringifyOptions, StringifiableRecord, UrlObject } from 'query-string'

interface XStringifyOptions extends StringifyOptions {
  fragmentIdentifier?: string
  sort: false
}

const defaultOptions = {
  skipNull: true,
  skipEmptyString: true,
  sort: false,
}

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
export {
  /**/
  XStringifyOptions,
  defaultOptions,
}

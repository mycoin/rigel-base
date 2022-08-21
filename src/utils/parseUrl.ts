/* eslint-disable no-script-url */
/* eslint-disable prefer-template */
import queryString, { ParsedUrl, ParseOptions } from 'query-string'

const defaultParseOptions = {
  parseNumbers: true,
  parseBooleans: true,
  parseFragmentIdentifier: true,
}

interface XParseOptions extends ParseOptions {
  parseNumbers: true
  parseBooleans: true
  parseFragmentIdentifier: true
}

/**
 * Extract the URL and the query string as an object.
 *
 * @param url - The URL to parse.
 */
const parseUrl = (url: string, options?: XParseOptions): ParsedUrl => {
  return queryString.parseUrl(url, {
    ...defaultParseOptions,
    ...options,
  })
}

export default parseUrl
export { XParseOptions }

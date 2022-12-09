/* eslint-disable no-script-url */
/* eslint-disable prefer-template */
import queryString, { ParsedUrl, ParseOptions } from 'query-string'

const defaultParseOptions = {
  parseNumbers: true,
  parseBooleans: true,
  parseFragmentIdentifier: true,
}

/**
 * Extract the URL and the query string as an object.
 *
 * @param url - The URL to parse.
 */
const parseUrl = (url: string, options?: ParseOptions): ParsedUrl => {
  const parseOptions = {
    ...defaultParseOptions,
    ...options,
  }

  const { parseBooleans, parseNumbers } = parseOptions
  const traverse = (value: string | string[]): any => {
    if (Array.isArray(value)) {
      return value.map(traverse)
    } else if (value && typeof value === 'string') {
      if (parseBooleans && ['true', 'false'].includes(value.toLowerCase())) {
        return value.toLowerCase() === 'true'
      } else if (parseNumbers && !Number.isNaN(Number(value))) {
        return Number(value) > Number.MAX_SAFE_INTEGER ? value : Number(value)
      }
    }
    return value
  }
  const parsedUrl = queryString.parseUrl(url, {
    ...parseOptions,
    parseNumbers: false,
    parseBooleans: false,
  })

  for (const keyName of Object.keys(parsedUrl.query || {})) {
    parsedUrl.query[keyName] = traverse(parsedUrl.query[keyName])
  }

  return parsedUrl
}

export default parseUrl

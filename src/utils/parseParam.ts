/* eslint-disable no-script-url */
/* eslint-disable prefer-template */
import { ParsedQuery, ParseOptions } from 'query-string'
import parseUrl from './parseUrl'

export default (queryString: string, options?: ParseOptions): ParsedQuery => {
  if (queryString && typeof queryString === 'string') {
    const fakerUrl = '?' + queryString.replace(/^[?&]*/g, '')
    const { query } = parseUrl(fakerUrl, options)

    return query || {}
  }
  return {}
}

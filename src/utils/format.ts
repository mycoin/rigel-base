const encodeHTML = (source: string): string => {
  return String(source)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const format = (tplString: string, dataMap: Record<string, any>): string => {
  const dataFrom = (dataMap && typeof dataMap === 'object')
    ? dataMap
    : {}

  if (typeof tplString !== 'string') {
    return ''
  }
  return String(tplString).replace(/\{(=|:)?(\w*)\}/g, (_: any, type: string, key: string) => {
    if (dataFrom[key] === undefined || dataFrom[key] === null) {
      return ''
    }
    if (type === '=') {
      return dataFrom[key]
    }
    if (type === ':') {
      return encodeURIComponent(dataFrom[key])
    }
    return encodeHTML(dataFrom[key])
  })
}

export default format

const encodeHTML = (source: string): string => {
  return String(source).replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export default (tpl: string, dataMap: Record<string, any>): string => {
  const data = dataMap && typeof dataMap === 'object' ? dataMap : {}

  if (typeof tpl === 'string') {
    return tpl.replace(/\{(=|:)?(\w*)\}/g, (_: any, type: string, key: string) => {
      if (data[key] === undefined || data[key] === null) {
        return ''
      } else if (type === '=') {
        return data[key]
      } else if (type === ':') {
        return encodeURIComponent(data[key])
      } else {
        return encodeHTML(data[key])
      }
    })
  } else {
    return ''
  }
}

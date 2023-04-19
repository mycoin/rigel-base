const formats: Record<string, string> = {
  short: 'YYYY-MM-DD',
  long: 'YYYY-MM-DD HH:mm:ss',
}

const pad = (num: number) => (num < 10 ? '0' + num : num)
const formatDate = (date: Date | number, patternStr?: 'short' | 'long' | string) => {
  const dt = new Date(date)
  if (isNaN(dt.getTime())) {
    return null
  }

  const result = patternStr ? formats[patternStr] || patternStr : formats.long
  const replacements = [
    [/YYYY/i, dt.getFullYear()],
    [/MM/, pad(dt.getMonth() + 1)],
    [/DD/i, pad(dt.getDate())],
    [/HH/, pad(dt.getHours())],
    [/mm|ii/, pad(dt.getMinutes())],
    [/ss/, pad(dt.getSeconds())],
  ]

  return replacements.reduce((acc, replacement) => {
    const [replace, target] = replacement as [RegExp | string, string]
    return acc.replace(replace, target)
  }, result)
}

export default formatDate

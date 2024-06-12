export const toDecimal = (value?: string | number | null) => {
  if (typeof value === 'number') {
    return value
  }
  if (typeof value === 'undefined' || value === null) {
    return null
  }
  return parseFloat(value.replace(/,/, '.').replace(/[^.\d]+/g, ''))
}

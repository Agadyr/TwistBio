export const toNumber = (value?: string | number | null) => {
  if (typeof value === 'undefined' || value === '' || value === null || Number.isNaN(value)) {
    return NaN
  }
  return Number(value.toString().replace(/,/, '.'))
}

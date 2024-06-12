export const onlyNumbers = (value?: string | number | null) => {
  if (typeof value === 'number') {
    return value
  }
  if (!value) {
    return null
  }
  return value.replace(/[^0-9]/g, '')
}

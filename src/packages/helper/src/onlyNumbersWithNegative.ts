export const onlyNumbersWithNegative = (value?: string | number | null) => {
  if (typeof value === 'number') {
    return value
  }
  if (!value) {
    return null
  }

  if (isNaN(Number(value.replace(/[^0-9|-]/g, '')))) {
    if (value[0] === '-') {
      return `-${value.replace(/[^0-9]/g, '')}`
    }

    return value.replace(/[^0-9]/g, '')
  }

  return value.replace(/[^0-9|-]/g, '')
}

export const onlyNumbersWithNegative = (value?: string | number | null): string | number | null => {
  if (typeof value === 'number') {
    return value
  }

  if (!value) {
    return null
  }

  const cleanedValue = value.replace(/[^0-9|-]/g, '')
  // Review убрал дублирование все перенес в cleanedValue
  if (isNaN(Number(cleanedValue))) {
    return value[0] === '-' ? `-${value.replace(/[^0-9]/g, '')}` : value.replace(/[^0-9]/g, '')
  }

  return cleanedValue
}

export const getEndNumberString = (number: number) => {
  if (number > 4) {
    return 'th'
  }
  if (number === 1) {
    return 'st'
  }
  if (number === 2) {
    return 'nd'
  }
  if (number === 3) {
    return 'rd'
  }
  return ''
}

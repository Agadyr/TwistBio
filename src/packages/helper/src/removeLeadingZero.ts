export const removeLeadingZero = (str?: string | null) => {
  if (!str) {
    return ''
  }
  if (str[0] === '0' && str[1] !== '.' && str.length > 1) {
    return str.slice(1)
  }
  return str
}

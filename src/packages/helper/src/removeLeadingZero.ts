//REVIEW: изменил str на string.
export const removeLeadingZero = (string?: string | null) => {
  if (!string) {
    return ''
  }
  if (string[0] === '0' && string[1] !== '.' && string.length > 1) {
    return string.slice(1)
  }
  return string
}

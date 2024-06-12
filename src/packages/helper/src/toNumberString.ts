import { removeLeadingZero } from './removeLeadingZero'

export const toNumberString = (value?: string | number | null) => {
  if (typeof value === 'undefined' || value === null) {
    return null
  }
  return removeLeadingZero(
    String(value)
      .replace(/,/, '.')
      .replace(/[^\d.-]+/g, ''),
  )
}

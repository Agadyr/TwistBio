import { toNumber } from './toNumber'

export const isNumber = (value?: string | number | null) => {
  if (typeof value === 'undefined' || value === '' || value === null || Number.isNaN(value)) {
    return false
  }
  return !Number.isNaN(toNumber(value))
}

import { isObject } from './isObject'

export const extractString = (value: any) => {
  if (typeof value === 'string') {
    return value
  }
  if (isObject(value)) {
    return ''
  }
  if (Array.isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      if (typeof value[i] === 'string') {
        return value[i]
      }
      if (Array.isArray(value[i])) {
        for (let j = 0; j < value[i].length; j++) {
          if (typeof value[i][j] === 'string') {
            return value[i][j]
          }
        }
      }
    }
    return ''
  }
  return String(value)
}

import { isObject } from './isObject'

//Review: Использование any крайне нежелательно. Тип здесь : string | object | [string].
// Может именно здесь оставить any потому здесь реально могут приходить разные данные для экстракта и также если
// изменяю на другие типы ругается на length
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

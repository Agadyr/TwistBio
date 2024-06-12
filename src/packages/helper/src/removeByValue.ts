import { remove } from 'lodash'

export const removeByValue = <T>(array?: T[] | null, value?: T) => {
  if (!array) {
    return []
  }
  const newArray = [...array]
  remove(newArray, (item) => item === value)
  return newArray
}

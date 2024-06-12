import { remove } from 'lodash'

export const removeElementFromArray = <T>(array?: T[] | null, value?: T) => {
  if (!array) {
    return
  }
  remove(array, (item) => item === value)
}

import { snakeCase } from 'lodash'

export const toSeparatedString = (string: string) => {
  const separatedStrInitial = snakeCase(string).split('_').join(' ')
  return separatedStrInitial.slice(0, 1).toUpperCase() + separatedStrInitial.slice(1)
}

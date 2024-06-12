export const updateBy = <T>(array: T[] | null | undefined, find: (item: T) => boolean, predicate: (item: T) => T) => {
  if (!array || typeof find === 'undefined') {
    return []
  }
  const newArray = [...array]
  const index = newArray.findIndex(find)
  if (index < 0) {
    return newArray
  }
  newArray[index] = predicate(newArray[index])
  return newArray
}

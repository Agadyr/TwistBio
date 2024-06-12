export const updateByIndex = <T>(
  array: T[] | null | undefined,
  index: number | undefined,
  predicate: (item: T) => T,
) => {
  if (!array || typeof index === 'undefined') {
    return []
  }
  const newArray = [...array]
  newArray[index] = predicate(newArray[index])
  return newArray
}

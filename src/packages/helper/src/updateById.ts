export const updateById = <T extends { id: number }>(
  array: T[] | null | undefined,
  id: number | undefined,
  predicate: (item: T) => T,
) => {
  if (!array || typeof id === 'undefined') {
    return []
  }
  const newArray = [...array]
  const index = newArray.findIndex((item) => item.id === id)
  if (index < 0) {
    return newArray
  }
  newArray[index] = predicate(newArray[index])
  return newArray
}

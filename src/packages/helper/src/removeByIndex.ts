export const removeByIndex = <T>(array?: T[] | null, index?: number) => {
  if (!array || typeof index === 'undefined') {
    return []
  }
  const newArray = [...array]
  newArray.splice(index, 1)
  return newArray
}

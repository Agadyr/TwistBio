//: Предпочтительнее использовать полные название вместо str.
//Review: Изменил на string.
export const truncateString = (string: string, maxLength: number): string => {
  if (string.length <= maxLength) {
    return string
  } else {
    return string.slice(0, maxLength) + '...'
  }
}

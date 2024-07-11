//: Предпочтительнее использовать полные название вместо i.
//Review: изменил на string.
export const randomString = (string: number) => {
  let rnd = ''
  while (rnd.length < string) {
    rnd += Math.random().toString(36).substring(2)
  }
  return rnd.substring(0, string)
}

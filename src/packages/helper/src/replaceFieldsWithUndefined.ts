type ReplaceFieldsWithUndefined<T> = {
  [K in keyof T]: undefined
}
//: Предпочтительнее использовать полные название вместо obj.
//: Review изменил на object.
export const replaceFieldsWithUndefined = <T extends Record<any, any>>(object: T): ReplaceFieldsWithUndefined<T> => {
  const newObj = {} as ReplaceFieldsWithUndefined<T>
  for (const key in object) {
    newObj[key] = undefined
  }
  return newObj
}

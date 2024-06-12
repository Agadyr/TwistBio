type ReplaceFieldsWithUndefined<T> = {
  [K in keyof T]: undefined
}

export const replaceFieldsWithUndefined = <T extends Record<any, any>>(obj: T): ReplaceFieldsWithUndefined<T> => {
  const newObj = {} as ReplaceFieldsWithUndefined<T>
  for (const key in obj) {
    newObj[key] = undefined
  }
  return newObj
}

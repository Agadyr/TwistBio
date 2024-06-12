import { camelCase, isArray, isObject, transform } from 'lodash'

export const toCamelCase = <CamelCase extends object>(obj: any): CamelCase =>
  transform(obj, (acc: any, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key as string)
    acc[camelKey] = isObject(value) ? toCamelCase(value) : value
  })

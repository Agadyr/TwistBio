import { isArray, isObject, snakeCase, transform } from 'lodash'

export const toSnakeCase = <SnakeCase extends object>(obj: any): SnakeCase =>
  transform(obj, (acc: any, value, key, target) => {
    const snakeKey = isArray(target) ? key : snakeCase(key as string)
    acc[snakeKey] = isObject(value) ? toSnakeCase(value) : value
  })

import { isArray, isObject, snakeCase, transform } from 'lodash'
//: Предпочтительнее использовать полные название вместо obj и избавиться от any.
// Review изменил на object но не понятно что здесь прилетает чтобы убрать any
export const toSnakeCase = <SnakeCase extends object>(object: any): SnakeCase =>
  transform(object, (acc: any, value, key, target) => {
    const snakeKey = isArray(target) ? key : snakeCase(key as string)
    acc[snakeKey] = isObject(value) ? toSnakeCase(value) : value
  })

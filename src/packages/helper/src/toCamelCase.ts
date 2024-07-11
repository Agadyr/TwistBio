import { camelCase, isArray, isObject, transform } from 'lodash'
//: Предпочтительнее использовать полные название вместо obj и избавиться от any.
//Review: Изменил на использование полного название но не понятно что будет приходить в toCamelCase из за
// этого не могу убрать any
export const toCamelCase = <CamelCase extends object>(object: any): CamelCase =>
  transform(object, (acc: any, value, key, target) => {
    const camelKey = isArray(target) ? key : camelCase(key as string)
    acc[camelKey] = isObject(value) ? toCamelCase(value) : value
  })

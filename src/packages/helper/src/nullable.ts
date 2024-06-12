/* eslint-disable @typescript-eslint/ban-types */
import { isEqual } from 'lodash'

import { isObject } from './isObject'

export type Validate<T, E = undefined> = Pick<
  T,
  {
    [Prop in keyof T]: T[Prop] extends E ? never : Prop
  }[keyof T]
>

export type ValidateArray<T, E = undefined> = Exclude<T, E>[]

export type DeepValidate<T, E = undefined> = Pick<
  T,
  {
    [Prop in keyof T]: T[Prop] extends E
      ? never
      : T[Prop] extends object
        ? // eslint-disable-next-line @typescript-eslint/ban-types
          {} extends DeepValidate<T[Prop], E>
          ? never
          : Prop
        : Prop
  }[keyof T]
>

export const nullsToUndefined = <T extends Record<any, any> | null>(data?: T): Validate<T, null> => {
  const newData: any = { ...data }
  for (const key in newData) {
    if (newData[key] === null) {
      newData[key] = undefined
    }
  }
  return newData
}

export const deleteUndefined = <T extends Record<any, any> | null>(data?: T): Validate<T> => {
  const newData: any = {}
  if (data) {
    for (const key in data) {
      if (data[key] !== undefined) {
        newData[key] = data[key]
      }
    }
  }
  return newData
}

export const deleteUndefinedInArray = <T = any>(array?: T[]): ValidateArray<T> => {
  if (!array) {
    return []
  }
  return array.filter((item) => item !== undefined) as ValidateArray<T>
}

export const isNullable = <T>(value?: T) => value === undefined || value === null

export const deleteNullable = <T extends Record<any, any> | null>(data?: T): Validate<T, null | undefined> => {
  const newData: any = {}
  if (data) {
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null) {
        newData[key] = data[key]
      }
    }
  }
  return newData
}

export const deleteNullableInArray = <T = any>(array?: T[]): ValidateArray<T, null | undefined> => {
  if (!array) {
    return []
  }
  return array.filter((item) => !isNullable(item)) as ValidateArray<T, null | undefined>
}

export const deleteNullableAndFalseInArray = <T = any>(array?: T[]): ValidateArray<T, null | false | undefined> => {
  if (!array) {
    return []
  }
  return array.filter((item) => !isNullable(item) && item !== false) as ValidateArray<T, null | false | undefined>
}

export const isEmpty = <T>(value?: T) => value === undefined || value === null || value === ''

export const deleteEmpty = <T extends Record<any, any> | null>(data?: T): Validate<T, null | undefined | ''> => {
  const newData: any = {}
  if (data) {
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '') {
        newData[key] = data[key]
      }
    }
  }
  return newData
}

export const deleteEmptyWithObjects = <T extends Record<any, any> | null>(
  data?: T,
): Validate<T, null | undefined | '' | {}> => {
  const newData: any = {}
  if (data) {
    for (const key in data) {
      if (data[key] !== undefined && data[key] !== null && data[key] !== '' && !isEqual(data[key], {})) {
        newData[key] = data[key]
      }
    }
  }
  return newData
}

export const isEmptyWithObjectsAndArrays = <T>(value?: T) =>
  value === undefined || value === null || value === '' || isEqual(value, {}) || isEqual(value, [])

export const deleteEmptyWithObjectsAndArrays = <T extends Record<any, any> | null>(
  data?: T,
): Validate<T, null | undefined | '' | {} | []> => {
  const newData: any = {}
  if (data) {
    for (const key in data) {
      if (!isEmptyWithObjectsAndArrays(data[key])) {
        newData[key] = data[key]
      }
    }
  }
  return newData
}

export const deleteEmptyInArray = <T = any>(array?: T[]): ValidateArray<T, null | undefined | ''> => {
  if (!array) {
    return []
  }
  return array.filter((item) => !isEmpty(item)) as ValidateArray<T, null | undefined | ''>
}

export const isEmptyWithArrays = <T>(value?: T) =>
  value === undefined ||
  value === null ||
  value === '' ||
  (Array.isArray(value) && value.length === 0) ||
  (isObject(Object.keys(value)) && Object.keys(value).length === 0)

export const deleteEmptyWithArrays = <T extends Record<any, any>>(
  data?: T,
): Validate<T, null | undefined | '' | never[] | readonly []> => {
  if (!data) {
    return {} as any
  }
  return Object.keys(data).reduce((newData, key) => {
    if (!isEmptyWithArrays(data[key])) {
      newData[key] = data[key]
    }
    return newData
  }, {} as any)
}

export const deleteEmptyParams = <T extends Record<any, any>>(
  data?: T,
): DeepValidate<T, null | undefined | '' | never[] | readonly []> => {
  if (!data) {
    return {} as any
  }
  return Object.keys(data).reduce((newData, key) => {
    if (isObject(data[key])) {
      const newObject = deleteEmptyParams(data[key])
      if (Object.keys(newObject).length) {
        newData[key] = newObject
      }
    } else if (!isEmptyWithArrays(data[key])) {
      newData[key] = data[key]
    }
    return newData
  }, {} as any)
}

export const deleteFalsy = <T extends Record<any, any> | null>(
  data?: T,
): Validate<T, null | undefined | '' | false | 0> => {
  const newData: any = {}
  if (data) {
    for (const key in data) {
      if (data[key]) {
        newData[key] = data[key]
      }
    }
  }
  return newData
}

export const isObjectWithoutData = <T extends Record<any, any>>(data?: T): boolean =>
  Object.keys(deleteEmptyWithArrays(data)).length === 0

export const isObjectWithoutDataDeep = <T extends Record<any, any>>(data?: T): boolean =>
  Object.keys(deleteEmptyParams(data)).length === 0

export const nullToUndefined = <T>(data?: T | null) => (data !== null ? data : undefined)

export const emptyToUndefined = <T>(data?: T | string | null) => {
  if (data === null || data === '' || Array.isArray(data)) {
    return
  }
  return data as Exclude<T, any[]> | string | undefined
}

export const isNonNullable = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined

type Truthy<T> = T extends false | '' | 0 | null | undefined ? never : T // from lodash

export const isTruthy = <T>(value: T): value is Truthy<T> => !!value

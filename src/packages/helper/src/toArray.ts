import { flatten } from 'lodash'

import { deleteNullableInArray } from './nullable'
import { NonArray } from './types'

export const toArray = <T>(children: T, filterFn = deleteNullableInArray<NonArray<T>>): ReturnType<typeof filterFn> =>
  Array.isArray(children) ? flatten(filterFn(children)) : filterFn([children as NonArray<T>])

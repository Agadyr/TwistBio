import { isEqual } from 'lodash'

import { isEmpty } from './isEmpty'
import { isObject } from './isObject'
import { deleteEmpty } from './nullable'

export const isEqualFormState = (saved: any, unsaved: any) =>
  !isEqual(
    isObject(saved) || isEmpty(saved) ? deleteEmpty(saved) : saved,
    isObject(unsaved) || isEmpty(unsaved) ? deleteEmpty(unsaved) : unsaved,
  )

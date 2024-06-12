import { toSnakeCase } from 'packages/helper'
import { stringify } from 'qs'

export const paramsSerializerToSnakeCase = (params: any) => stringify(toSnakeCase(params))
export const paramsSerializerToSnakeCaseArrayBrackets = (params: any) =>
  stringify(toSnakeCase(params), { arrayFormat: 'brackets', encodeValuesOnly: true })

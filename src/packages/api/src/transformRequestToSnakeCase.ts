import { toSnakeCase } from 'packages/helper'

export const transformRequestToSnakeCase = (data: any) =>
  data instanceof FormData ? data : JSON.stringify(toSnakeCase(data))

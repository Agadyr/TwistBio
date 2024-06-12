import { toCamelCase } from 'packages/helper'

export const transformResponseToCamelCase = (data: any) => {
  try {
    return toCamelCase(JSON.parse(data))
  } catch (e) {
    return data
  }
}

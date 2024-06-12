export const isObject = (value: any): value is object =>
  typeof value === 'object' && !Array.isArray(value) && value !== null

export const findById = <T extends { id: any }>(items: T[] | undefined, id: any): T | undefined =>
  id ? items?.find((item) => item.id === id) : undefined

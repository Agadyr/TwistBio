//Review: id: string или id: number. в крайнем случае string | number.
//Review убрал any
export const findById = <T extends { id: string | number }>(
  items: T[] | undefined,
  id: string | number,
): T | undefined =>
  //Review: Если id = 0 , будет false.
  //REVIEW не понял ТУДУ
  id ? items?.find((item) => item.id === id) : undefined

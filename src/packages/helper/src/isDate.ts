// Желательно избавиться от any по всем методам  в директории helper.
//Review Избавился во многих местах но в некоторых когда изменяю есть ошибки на типизацию и в некоторых местах не
// понятно как изменить
export const isDate = (date: unknown): boolean =>
  typeof date === 'string' || typeof date === 'number' ? !Number.isNaN(new Date(date).getTime()) : false

export const isServerDate = (date: unknown): boolean =>
  isDate(date) && typeof date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(date)

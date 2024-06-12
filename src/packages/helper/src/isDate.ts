export const isDate = (date: any) => !Number.isNaN(new Date(date).getTime())
export const isServerDate = (date: any) => isDate(date) && /^\d{4}-\d{2}-\d{2}$/.test(date)

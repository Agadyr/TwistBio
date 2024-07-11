import { ApiError } from './apiTypingErrors'

const SERVER_ERROR_START = '5'
//: При чтении кода не ясно что такое "5", такие значения лучше выносить в понятно названные переменные.
//Review положил пять в переменную
export const isServerError = (error: ApiError | null): boolean => String(error?.status)[0] === SERVER_ERROR_START

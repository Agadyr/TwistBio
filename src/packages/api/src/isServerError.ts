import { ApiError } from './apiTypingErrors'

export const isServerError = (error: ApiError | null) => String(error?.status)[0] === '5'

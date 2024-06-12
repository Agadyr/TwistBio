import { ReactNode } from 'react'

import { ApiError, ApiTypingErrors } from 'packages/api'

import { RejectError } from './types'

export const apiTypingErrors = new ApiTypingErrors()

const { createApiError } = apiTypingErrors

export const getError = <Return extends string | ReactNode = string | ReactNode>(
  error?: unknown | ApiError | null,
): Return => {
  const apiError = error as (ApiError & { msg: string | null }) | null
  if (!apiError) {
    return null as Return
  }
  return (apiError.detail ?? apiError.msg ?? apiError.message ?? null) as Return
}

export const getErrorMessage = (error?: unknown | ApiError | null) => {
  const apiError = error as (ApiError & { msg: string | null }) | null
  if (!apiError) {
    return null
  }

  return (apiError.response?.data?.detail ?? apiError.msg ?? apiError.message ?? apiError.response ?? null) as
    | string
    | null
}

export const requestWithDefaultError =
  <Result>(
    promise: (...args: any[]) => Promise<Result> | Result | undefined,
    error?: RejectError,
  ): ((...args: any[]) => Promise<Result>) =>
  (...args: any[]) =>
    Promise.resolve(promise(...args))
      .then((result) => result as Result)
      .catch((err: ApiError | null) => {
        if (typeof error === 'function') {
          throw createApiError(error(err))
        }
        const defaultMessage = typeof error === 'string' || error === null ? error : error?.message ?? getError(err)
        throw createApiError({
          ...err,
          message: defaultMessage,
          showToast:
            defaultMessage &&
            (!error || typeof error === 'string' || (typeof error === 'object' && error?.showToast !== false)),
        })
      })

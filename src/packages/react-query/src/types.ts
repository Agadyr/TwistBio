import { DefaultError, QueryFunction, QueryKey, UseQueryOptions as UseQueryOptionsNative } from '@tanstack/react-query'
import { Draft } from 'immer'
import { ApiError } from 'packages/api'

export interface ToastError {
  message?: string | null
  showToast?: boolean
}

export type RejectError =
  | string
  | ToastError
  | ((error?: ApiError | null) => (ApiError & ToastError) | undefined | null)
  | undefined
  | null

export type MutationFunction<TData = unknown, TVariables = unknown> = (
  variables: TVariables,
) => Promise<TData> | undefined

export type UsePaginateQueryOptions<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
> = Omit<UseQueryOptionsNative<TQueryFnData, TError, TData, TQueryKey>, 'queryFn' | 'initialData'> & {
  queryFn?: QueryFunction<TQueryFnData | undefined, TQueryKey, number>
  initialData?: undefined
}

export type WritableDraft<T> = { -readonly [K in keyof T]: Draft<T[K]> }

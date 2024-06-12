import { ReactNode } from 'react'

import type { AxiosError, AxiosResponse } from 'axios'
import { camelCase } from 'lodash'

export interface ApiErrorServerDefault {
  detail: string
}

export interface PromiseError<T, Error> extends Promise<T> {
  then<TResult1 = T, TResult2 = never>(
    onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null,
    onrejected?: ((reason: Error) => TResult2 | PromiseLike<TResult2>) | undefined | null,
  ): PromiseError<TResult1 | TResult2, Error>
  catch<TResult = never>(
    onrejected?: ((reason: Error) => TResult | PromiseLike<TResult>) | undefined | null,
  ): Promise<T | TResult>
}

type ApiWithTypedErrors<Api, ApiError> = Api extends { [Key in keyof Api]: Api[Key] }
  ? {
      [Key in keyof Api]: Api[Key] extends { [MethodName in keyof Api[Key]]: Api[Key][MethodName] }
        ? {
            [MethodName in keyof Api[Key]]: Api[Key][MethodName] extends (...args: infer Args) => Promise<infer Data>
              ? (...args: Args) => PromiseError<Data, ApiError>
              : Api[Key][MethodName]
          }
        : Api[Key]
    }
  : Api

export type ValidationErrorsApi = Record<string, string> | null | undefined

export interface ApiError {
  original?: any
  message: string | null | ReactNode
  detail?: string | null
  code?: string
  validation?: ValidationErrorsApi
  status: number
  response: AxiosResponse
}

export interface ApiTypingErrorsOptions<Error = Omit<ApiError, 'status'>, ErrorFromServer = ApiErrorServerDefault> {
  notFoundStatus: number
  notValidStatus: number
  initialError: Error | (() => Error)
  notFoundError?: Error | (() => Error)
  notValidError?: Error | (() => Error)
  validationReplaceToCamelCase?: boolean
  getMessageErrorApi: (responseError: AxiosResponse<ErrorFromServer>) => string | undefined
  getCodeErrorApi: (responseError: AxiosResponse<ErrorFromServer>) => string | undefined
  getValidationErrors: (responseError: AxiosResponse<ErrorFromServer>) => ValidationErrorsApi
}

export class ApiTypingErrors<TypeError = ApiError, ErrorFromServer = ApiErrorServerDefault> {
  private readonly options: ApiTypingErrorsOptions<any, any> = {
    notFoundStatus: 404,
    notValidStatus: 422,

    initialError: {
      message: 'Ошибка',
      code: 'error',
    },
    validationReplaceToCamelCase: false,

    getMessageErrorApi: (responseError) =>
      responseError?.data?.detail ??
      responseError?.data?.error?.detail ??
      responseError?.data?.error?.msg ??
      responseError?.data?.file?.[0],
    getCodeErrorApi: (responseError) => responseError?.data?.code ?? responseError?.data?.error?.code,

    getValidationErrors: (responseError) => {
      const errorsApi = (responseError?.data?.errors ?? responseError?.data) as Record<string, string[] | string>
      const errors: ValidationErrorsApi = {}
      if (Array.isArray(errorsApi)) {
        errorsApi.forEach((item) => {
          for (const param in item) {
            if (Array.isArray(item[param]) && item[param]?.[0]) {
              errors[this.options.validationReplaceToCamelCase ? camelCase(param) : param] = item[param][0]
            } else if (!Array.isArray(item[param]) && item[param]) {
              errors[this.options.validationReplaceToCamelCase ? camelCase(param) : param] = item[param]
            }
          }
        })
      } else {
        for (const param in errorsApi) {
          let key = this.options.validationReplaceToCamelCase ? camelCase(param) : param
          if (key === 'error') {
            key = 'root'
          }
          if (Array.isArray(errorsApi[param]) && errorsApi[param]?.[0]) {
            errors[key] = errorsApi[param][0]
          } else if (!Array.isArray(errorsApi[param]) && errorsApi[param]) {
            errors[key] = (
              typeof errorsApi[param] === 'object' ? (errorsApi[param] as any)?.msg : errorsApi[param]
            ) as string
          }
        }
      }
      if (!Object.keys(errors).length) {
        return null
      }
      return errors
    },
  }

  constructor(options?: Partial<ApiTypingErrorsOptions<Omit<TypeError, 'status'>, ErrorFromServer>>) {
    if (options) {
      this.options = Object.assign(this.options, options)
    }
  }

  createApi = <Api>(methodsObject: Api) => methodsObject as ApiWithTypedErrors<Api, Partial<TypeError>>

  errorInterceptor = (error: AxiosError) => {
    if ((error as any).isRetryError) {
      delete (error as any).isRetryError
      return Promise.reject(error)
    }
    const errorAxios = error as AxiosError<ErrorFromServer>
    let apiError: any =
      typeof this.options.initialError === 'function' ? this.options.initialError() : this.options.initialError

    if (errorAxios.response) {
      const response = errorAxios.response
      if (this.options.getMessageErrorApi(response)) {
        apiError = {
          original: response.data,
          message: this.options.getMessageErrorApi(response),
        }
        if (this.options.getCodeErrorApi(response)) {
          apiError.code = this.options.getCodeErrorApi(response)
        }
      }
      if (response.status === this.options.notFoundStatus && this.options.notFoundError) {
        apiError = {
          ...(typeof this.options.notFoundError === 'function'
            ? this.options.notFoundError()
            : this.options.notFoundError),
          original: response.data,
        }
      } else if (response.status === this.options.notValidStatus && this.options.notValidError) {
        apiError = {
          ...(typeof this.options.notValidError === 'function'
            ? this.options.notValidError()
            : this.options.notValidError),
          original: response.data,
          validation: this.options.getValidationErrors(response),
        }
        const errorFromResponse = this.options.getMessageErrorApi(response)
        if (errorFromResponse) {
          apiError.detail = errorFromResponse
        }
      }
    }
    apiError.status = error.response?.status || 500
    return Promise.reject(apiError)
  }

  createApiError = <TypeApiError = TypeError extends ApiError ? ApiError : TypeError>(apiError: TypeApiError) =>
    apiError as unknown as Error
}

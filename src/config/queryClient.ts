import { toast } from 'react-toastify'

import { MutationCache, QueryCache, QueryClient } from '@tanstack/react-query'
import { getErrorMessage, noRetryOnError, ToastError } from 'packages/react-query'

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      const errorField = typeof query.meta?.error === 'function' ? query.meta?.error(error) : query.meta?.error
      const showToast = typeof errorField === 'object' ? errorField?.showToast ?? true : true
      const errorQuery = typeof errorField === 'object' ? errorField?.message : errorField
      const errorMessage = typeof errorQuery !== 'undefined' ? errorQuery : getErrorMessage(error)
      if (showToast && errorMessage) {
        toast.error(errorMessage)
      }
      if (error) {
        error.message = errorMessage
      }
    },
    onSuccess: (data, query) => {
      if (data !== undefined && query.state.dataUpdateCount === 1) {
        query.meta?.onSuccess?.(data)
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      const errorField = typeof mutation.meta?.error === 'function' ? mutation.meta?.error(error) : mutation.meta?.error
      const showToast = typeof errorField === 'object' ? errorField?.showToast ?? true : true
      const errorQuery = typeof errorField === 'object' ? errorField?.message : errorField
      const errorMessage = typeof errorQuery !== 'undefined' ? errorQuery : getErrorMessage(error)
      if (showToast && errorMessage) {
        toast.error(errorMessage)
      }
      if (error) {
        error.message = errorMessage
      }
    },
  }),
  defaultOptions: {
    queries: {
      ...noRetryOnError,
      staleTime: Infinity,
    },
    mutations: {
      retry: false,
      onError: (error) => {
        if ((error as ToastError).showToast) {
          toast.error((error as ToastError).message)
        }
      },
    },
  },
})

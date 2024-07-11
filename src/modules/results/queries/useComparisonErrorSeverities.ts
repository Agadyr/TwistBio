import { useQuery } from '@tanstack/react-query'
import { errorsSever } from 'modules/results/constatns/api'

import { comparisonErrorsQueryKey } from './types'

export const useComparisonErrorSeverities = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [comparisonErrorsQueryKey],
    // для будущей отправки запроса в бэк для того чтобы взять оттуда критичности ошибок
    // queryFn: comparisonErrorsApi.getErrorSeverities,
    queryFn: () => Promise.resolve(errorsSever),
  })

  return {
    errorSeverities: data,
    errorSeveritiesAreLoading: isPending,
    errorSeveritiesRequestError: error,
  }
}

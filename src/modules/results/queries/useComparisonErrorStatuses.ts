import { useQuery } from '@tanstack/react-query'
import { errors } from 'modules/results/constatns/api'

import { comparisonErrorsQueryKey } from './types'

export const useComparisonErrorStatuses = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [comparisonErrorsQueryKey],
    // queryFn: comparisonErrorsApi.getErrorStatuses,
    queryFn: () => Promise.resolve(errors),
  })

  return {
    errorStatuses: data,
    errorStatusesAreLoading: isPending,
    errorStatusesRequestError: error,
  }
}

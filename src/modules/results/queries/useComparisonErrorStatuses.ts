import { useQuery } from '@tanstack/react-query'
import { errorsStatus } from 'modules/results/constatns/api'

import { comparisonErrorsQueryKey } from './types'

export const useComparisonErrorStatuses = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [comparisonErrorsQueryKey],
    // queryFn: comparisonErrorsApi.getErrorStatuses,
    queryFn: () => Promise.resolve(errorsStatus),
  })

  return {
    errorStatuses: data,
    errorStatusesAreLoading: isPending,
    errorStatusesRequestError: error,
  }
}

import { useQuery } from '@tanstack/react-query'
import { comparisonErrorsApi } from 'modules/results/api'

import { comparisonErrorsPairsKey } from './types'

export const usePairErrors = (comparisonId: number, pairId: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: [comparisonErrorsPairsKey, comparisonId, pairId],
    queryFn: () => comparisonErrorsApi.getPairErrors(comparisonId, pairId),
    enabled: !!comparisonId && !!pairId,
  })
  return {
    pairErrors: data,
    pairErrorsAreLoading: isPending,
    pairErrorsRequestError: error,
  }
}

import { useQuery } from '@tanstack/react-query'
import { comparisonApi } from 'modules/comparison/api/methods'

import { comparisonKey } from './types'

export const useComparison = (comparisonId: number) => {
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: [comparisonKey, comparisonId],
    queryFn: () => comparisonApi.getComparison(comparisonId),
  })

  return {
    comparison: data,
    isComparisonLoading: isPending,
    comparisonError: error,
    isLoading,
  }
}

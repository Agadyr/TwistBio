import { useQuery } from '@tanstack/react-query'
import { comparisonApi } from 'modules/comparison/api/methods'

import { comparisonReportKey } from './types'

export const useGetComparisonReport = (comparisonId: number) => {
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: [comparisonReportKey, comparisonId],
    queryFn: () => comparisonApi.getComparisonReport(comparisonId),
  })

  return {
    comparison: data,
    isComparisonLoading: isPending,
    comparisonError: error,
    isLoading,
  }
}

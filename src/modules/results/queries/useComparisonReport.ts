import { useQuery } from '@tanstack/react-query'
import { comparisonErrorsApi } from 'modules/results/api'

import { comparisonErrorsPairsKey } from './types'

export const useComparisonReport = (comparisonId: number) => {
  const { data, isPending, error } = useQuery({
    queryKey: [comparisonErrorsPairsKey, comparisonId],
    queryFn: () => comparisonErrorsApi.postComparisonReport(comparisonId),
    enabled: comparisonId > 0,
  })
  return {
    comparisonReport: data,
    comparisonReportAreLoading: isPending,
    comparisonReportRequestError: error,
  }
}

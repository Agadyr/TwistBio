import { useQuery } from '@tanstack/react-query'
import { comparisonApi } from 'modules/comparison/api/methods'

import { comparisonDownloadReportKey } from './types'

export const usePrintComparisonReport = (comparisonId: number) => {
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: [comparisonDownloadReportKey, comparisonId],
    queryFn: () => comparisonApi.printComparisonReport(comparisonId),
    enabled: comparisonId > 0,
  })

  return {
    comparison: data,
    isComparisonLoading: isPending,
    comparisonError: error,
    isLoading,
  }
}

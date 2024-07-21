import { useQuery } from '@tanstack/react-query'
import { comparisonApi } from 'modules/comparison/api/methods'

import { comparisonDownloadReportKey } from './types'

export const useDownloadComparisonReport = (comparisonId: number) => {
  const { data, isLoading, isPending, error } = useQuery({
    queryKey: [comparisonDownloadReportKey, comparisonId],
    queryFn: () => comparisonApi.downloadComparisonReport(comparisonId),
    enabled: comparisonId > 0,
  })

  return {
    comparison: data,
    isComparisonLoading: isPending,
    comparisonError: error,
    isLoading,
  }
}

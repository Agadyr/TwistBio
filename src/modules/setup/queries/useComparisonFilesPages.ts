import { useQuery } from '@tanstack/react-query'
import { comparisonPageApi } from 'modules/setup/api'

import { comparisonFilesPagesQueryKey } from './types'

export const useComparisonFilesPages = (comparisonId: number, isReference: boolean = false) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [comparisonFilesPagesQueryKey, comparisonId, isReference],
    queryFn: () => comparisonPageApi.getComparisonFilesPages(comparisonId, isReference),
    enabled: !!comparisonId,
  })
  console.log(data, 'DAta')
  return {
    filesPages: data,
    filesPagesAreLoading: isPending,
    filesPagesRequestError: error,
    refetchFilesPages: refetch,
  }
}

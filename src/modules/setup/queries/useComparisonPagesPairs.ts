import { useQuery } from '@tanstack/react-query'
import { comparisonPagesPairsQueryKey } from 'modules/comparison/queries'
import { comparisonPairApi } from 'modules/setup/api'

export const useComparisonPagesPairs = (comparisonId: number) => {
  const { data, isPending, error, refetch } = useQuery({
    queryKey: [comparisonPagesPairsQueryKey, comparisonId],
    queryFn: () => comparisonPairApi.getPairs(comparisonId),
    enabled: !!comparisonId,
  })

  return {
    comparisonPagesPairs: data,
    comparisonPagesPairsAreLoading: isPending,
    comparisonPagesPairsRequestError: error,
    refetchComparisonPages: refetch,
  }
}

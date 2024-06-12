import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'config/queryClient'
import { comparisonPagesPairsQueryKey } from 'modules/comparison/queries'
import { comparisonKey } from 'modules/comparison/queries/types'
import { comparisonFilesPagesQueryKey } from 'modules/setup/queries/types'
import { comparisonApi, StageAndStep } from 'modules/type/api'

export const useUpdateComparison = (onSuccess: VoidFunction, comparisonId: number) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: { comparisonId: number; payload: StageAndStep }) =>
      comparisonApi.updateComparison(payload.comparisonId, payload.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [comparisonKey, comparisonId] })
      queryClient.removeQueries({ queryKey: [comparisonFilesPagesQueryKey, comparisonId, true] })
      queryClient.removeQueries({ queryKey: [comparisonFilesPagesQueryKey, comparisonId, false] })
      queryClient.removeQueries({ queryKey: [comparisonPagesPairsQueryKey, comparisonId] })
      onSuccess?.()
    },
  })

  return {
    updateComparison: mutate,
    isUpdatingComparison: isPending,
    updateComparisonError: error,
  }
}

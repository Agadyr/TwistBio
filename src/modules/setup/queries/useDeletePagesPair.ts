import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'config/queryClient'
import { comparisonPagesPairsQueryKey } from 'modules/comparison/queries'
import { comparisonPairApi } from 'modules/setup/api'

export const useDeletePagesPair = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: { comparisonId: number; pageId: number }) =>
      comparisonPairApi.deletePair(payload.comparisonId, payload.pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [comparisonPagesPairsQueryKey], refetchType: 'all' })
    },
  })

  return {
    deletePair: mutate,
    isPairDeleting: isPending,
    deletePairError: error,
  }
}

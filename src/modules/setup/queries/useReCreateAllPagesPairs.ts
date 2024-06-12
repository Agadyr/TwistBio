import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'config/queryClient'
import { comparisonPagesPairsQueryKey } from 'modules/comparison/queries'
import { ComparisonAllPairsPayload, comparisonPairApi } from 'modules/setup/api'

export const useReCreateAllPagesPairs = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: { comparisonId: number; payload: ComparisonAllPairsPayload }) =>
      comparisonPairApi.recreatePagesPairs(payload.comparisonId, payload.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [comparisonPagesPairsQueryKey], refetchType: 'all' })
    },
  })

  return {
    recreatePagesPairs: mutate,
    isRecreatingPagesPairs: isPending,
    recreatePagesPairsError: error,
  }
}

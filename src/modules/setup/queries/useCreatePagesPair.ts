import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'config/queryClient'
import { comparisonPagesPairsQueryKey } from 'modules/comparison/queries'
import { comparisonPairApi, ComparisonPairPayload } from 'modules/setup/api'

export const useCreatePagesPair = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ comparisonId, pairData }: { comparisonId: number; pairData: ComparisonPairPayload }) =>
      comparisonPairApi.createPair(comparisonId, pairData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [comparisonPagesPairsQueryKey], refetchType: 'all' })
    },
  })

  return {
    createPair: mutate,
    isCreatingPair: isPending,
    createPairError: error,
  }
}

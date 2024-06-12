import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { comparisonApi, Stage } from 'modules/type/api'

export const useCreateComparison = () => {
  const navigate = useNavigate()

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (payload: Stage) => comparisonApi.createComparison(payload),
    onSuccess: (response) => navigate({ to: '/$comparisonId/type', params: { comparisonId: String(response.id) } }),
  })

  return {
    createComparison: mutate,
    isCreatingComparison: isPending,
    createComparisonError: error,
  }
}

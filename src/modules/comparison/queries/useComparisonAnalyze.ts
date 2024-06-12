import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { queryClient } from 'config/queryClient'
import { comparisonApi } from 'modules/comparison/api/methods'

import { comparisonPagesPairsQueryKey } from './types'

export const useComparisonAnalyze = (comparisonId: string) => {
  const navigate = useNavigate()
  const { mutate, isPending, error } = useMutation({
    mutationFn: () => comparisonApi.analyzeComparison(Number(comparisonId)),
    onSuccess: () => {
      toast.success('Анализ выполнен')
      queryClient.removeQueries({ queryKey: [comparisonPagesPairsQueryKey] })
      navigate({ to: '/$comparisonId/results', params: { comparisonId } })
    },
    onError: () => {
      navigate({ to: '/$comparisonId/setup', params: { comparisonId } })
    },
  })

  return {
    analyze: mutate,
    isAnalyzeLoading: isPending,
    analyzeError: error,
  }
}

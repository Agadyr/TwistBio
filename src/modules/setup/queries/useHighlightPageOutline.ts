import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'config/queryClient'
import { comparisonPageApi } from 'modules/setup/api'

import { comparisonFilesPagesQueryKey } from './types'

export const useHighlightPageOutline = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: { comparisonId: number; pageId: number }) =>
      comparisonPageApi.highlightPageOutline(payload.comparisonId, payload.pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [comparisonFilesPagesQueryKey], refetchType: 'all' })
    },
  })
  return {
    highlightPageOutline: mutate,
    isHighlighting: isPending,
    highlightError: error,
  }
}

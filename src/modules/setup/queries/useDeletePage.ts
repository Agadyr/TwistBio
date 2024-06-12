import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'config/queryClient'
import { comparisonPageApi } from 'modules/setup/api'

import { comparisonFilesPagesQueryKey } from './types'

export const useDeletePage = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: { comparisonId: number; pageId: number }) =>
      comparisonPageApi.deletePage(payload.comparisonId, payload.pageId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [comparisonFilesPagesQueryKey], refetchType: 'all' })
      toast.success('Страница удалена')
    },
  })

  return {
    deletePage: mutate,
    isPageDeleting: isPending,
    deletePageError: error,
  }
}

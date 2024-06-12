import { useMutation } from '@tanstack/react-query'
import { queryClient } from 'config/queryClient'
import { comparisonFileApi, FilePagesPayload } from 'modules/setup/api'

import { comparisonFilesPagesQueryKey } from './types'

export const useSendFilePages = (comparisonId: number) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: ({ comparisonFileId, payload }: { comparisonFileId: number; payload: FilePagesPayload }) =>
      comparisonFileApi.putFilePages(comparisonId, comparisonFileId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [comparisonFilesPagesQueryKey, comparisonId] })
    },
  })

  return {
    sendFilePages: mutate,
    isUploadingComparisonFile: isPending,
    uploadComparisonFileError: error,
  }
}

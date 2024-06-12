import { useMutation } from '@tanstack/react-query'
import { comparisonFileApi } from 'modules/setup/api'

export const useUploadComparisonFile = () => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (payload: { comparisonId: number; payload: FormData }) =>
      comparisonFileApi.uploadComparisonFile(payload.comparisonId, payload.payload),
  })

  return {
    uploadComparisonFile: mutate,
    isUploadingComparisonFile: isPending,
    uploadComparisonFileError: error,
  }
}

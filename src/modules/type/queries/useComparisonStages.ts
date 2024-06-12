import { useQuery } from '@tanstack/react-query'
import { comparisonApi, UploadType } from 'modules/type/api'

import { comparisonTypesQueryKey } from './types'

export const useComparisonStages = (uploadType: UploadType) => {
  const { data, isPending, error } = useQuery({
    queryKey: [comparisonTypesQueryKey, uploadType],
    queryFn: () => comparisonApi.getComparisonStages(uploadType),
  })

  return {
    comparisonStages: data,
    comparisonStagesAreLoading: isPending,
    comparisonStagesRequestError: error,
  }
}

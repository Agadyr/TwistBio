import { useQuery } from '@tanstack/react-query'
import { errorsStatus } from 'modules/results/constatns/api'

import { comparisonErrorsQueryKey } from './types'

export const useComparisonErrorStatuses = () => {
  const { data, isPending, error } = useQuery({
    queryKey: [comparisonErrorsQueryKey],
    // для будущей отправки запроса в бэк для того чтобы взять оттуда критичности ошибок
    // queryFn: comparisonErrorsApi.getErrorStatuses,
    queryFn: () => Promise.resolve(errorsStatus),
  })

  return {
    errorStatuses: data,
    errorStatusesAreLoading: isPending,
    errorStatusesRequestError: error,
  }
}

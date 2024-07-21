import { toast } from 'react-toastify'

import { useMutation } from '@tanstack/react-query'
import { comparisonApi } from 'modules/comparison/api/methods'

export const useSendReport = (comparisonId: string) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: (email: string) => comparisonApi.sendComparisonReport(Number(comparisonId), email),
    onSuccess: () => {
      toast.success('Отчет отправлен на вашу почту')
    },
    onError: () => {
      toast.error('Что-то пошло не так повторите еще раз')
    },
  })

  return {
    send: mutate,
    isSendLoading: isPending,
    sendError: error,
  }
}

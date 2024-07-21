import { axios } from 'config/axios'
import { GetArrayResponse, GetOneResponse } from 'interfaces/api.interfaces'
import { SendReport } from 'modules/results/api'
import { FormData } from 'pages/comparison/Conclusion/interfaces/conclusionblock'

import { comparisonEndpoints } from './endpoints'
import { ComparisonPairResponse, ComparisonResponse, Evaluation } from './interfaces'

const getComparison = async (comparisonId: number): GetOneResponse<ComparisonResponse> =>
  (await axios.get(comparisonEndpoints.get(comparisonId))).data

const analyzeComparison = async (comparisonId: number): GetArrayResponse<ComparisonPairResponse> =>
  (await axios.post(comparisonEndpoints.analyze(comparisonId))).data

const patchComparison = async (comparisonId: number, data: FormData): GetOneResponse<ComparisonResponse> =>
  (
    await axios.patch(comparisonEndpoints.patch(comparisonId), {
      params: data,
    })
  ).data

const getComparisonReport = async (comparisonId: number): GetOneResponse<Evaluation> =>
  (await axios.get(comparisonEndpoints.getReport(comparisonId))).data

const downloadComparisonReport = async (comparisonId: number): Promise<void> => {
  const response = await axios.get(comparisonEndpoints.downloadReport(comparisonId), {
    responseType: 'blob',
  })

  const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }))

  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `comparison_report_${comparisonId}.pdf`)
  document.body.appendChild(link)
  link.click()

  window.URL.revokeObjectURL(url)
  document.body.removeChild(link)
  return response.data
}
const printComparisonReport = async (comparisonId: number): Promise<void> => {
  try {
    const response = await axios.get(comparisonEndpoints.downloadReport(comparisonId), {
      responseType: 'blob',
    })

    const blob = new Blob([response.data], { type: 'application/pdf' })
    const url = URL.createObjectURL(blob)

    const newWindow = window.open(url, '_blank')
    if (newWindow) {
      newWindow.onload = () => {
        newWindow.print()
      }

      setTimeout(() => {
        URL.revokeObjectURL(url)
      }, 1000)
    } else {
      console.error('Не удалось открыть новое окно. Убедитесь, что всплывающие окна не блокируются.')
    }
  } catch (error) {
    console.error('Ошибка при загрузке или печати отчета:', error)
  }
}

const sendComparisonReport = async (comparisonId: number, email: string): GetOneResponse<SendReport> =>
  (
    await axios.post(comparisonEndpoints.sendReport(comparisonId), {
      e_mail: email,
    })
  ).data
export const comparisonApi = {
  getComparisonReport,
  getComparison,
  analyzeComparison,
  patchComparison,
  downloadComparisonReport,
  sendComparisonReport,
  printComparisonReport,
}

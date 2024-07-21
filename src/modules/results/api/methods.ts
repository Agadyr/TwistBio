import { axios } from 'config/axios'
import { GetArrayResponse, GetOneResponse } from 'interfaces/api.interfaces'

import { comparisonErrorEndpoints, postComparisonReportEndpoint } from './endpoints'
import { ComparisonError, ComparisonPairErrors, ComparisonReport } from './interfaces'

const getErrorSeverities = async (): GetArrayResponse<ComparisonError> =>
  (await axios.get(comparisonErrorEndpoints.severities())).data.data

const getErrorStatuses = async (): GetArrayResponse<ComparisonError> =>
  (await axios.get(comparisonErrorEndpoints.statuses())).data.data

const getErrorTypes = async (): GetArrayResponse<ComparisonError> =>
  (await axios.get(comparisonErrorEndpoints.severities())).data.data

const getPairErrors = async (comparisonId: number, pairId: number): GetOneResponse<ComparisonPairErrors> =>
  (await axios.get(comparisonErrorEndpoints.pairErrors(comparisonId, pairId))).data

const postComparisonReport = async (comparisonId: number): GetOneResponse<ComparisonReport> =>
  (await axios.post(postComparisonReportEndpoint.postComparisonReport(comparisonId))).data

export const comparisonErrorsApi = {
  getErrorSeverities,
  getErrorStatuses,
  getErrorTypes,
  getPairErrors,
  postComparisonReport,
}

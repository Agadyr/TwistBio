import { axios } from 'config/axios'
import { GetArrayResponse, GetOneResponse } from 'interfaces/api.interfaces'

import { comparisonEndpoints } from './endpoints'
import { ComparisonPairResponse, ComparisonResponse } from './interfaces'

const getComparison = async (comparisonId: number): GetOneResponse<ComparisonResponse> =>
  (await axios.get(comparisonEndpoints.get(comparisonId))).data

const analyzeComparison = async (comparisonId: number): GetArrayResponse<ComparisonPairResponse> =>
  (await axios.post(comparisonEndpoints.analyze(comparisonId))).data

export const comparisonApi = {
  getComparison,
  analyzeComparison,
}

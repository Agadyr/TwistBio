import { axios } from 'config/axios'
import { GetArrayResponse, GetOneResponse } from 'interfaces/api.interfaces'

import { comparisonEndpoints } from './endpoints'
import { ComparisonCreationResponse, ComparisonType, Stage, StageAndStep, UploadType } from './interfaces'

const getComparisonStages = async (uploadType: UploadType): GetArrayResponse<ComparisonType> =>
  (
    await axios.get(comparisonEndpoints.stages(), {
      params: {
        uploadType,
      },
    })
  ).data

const createComparison = async (payload: Stage): GetOneResponse<ComparisonCreationResponse> =>
  (await axios.post(comparisonEndpoints.create(), payload)).data

const updateComparison = async (
  comparisonId: number,
  payload: StageAndStep,
): GetOneResponse<ComparisonCreationResponse> =>
  (await axios.patch(comparisonEndpoints.update(comparisonId), payload)).data

export const comparisonApi = {
  getComparisonStages,
  createComparison,
  updateComparison,
}

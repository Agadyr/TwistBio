import { axios } from 'config/axios'
import { GetArrayResponse, GetOneResponse } from 'interfaces/api.interfaces'
import { ComparisonPairResponse } from 'modules/comparison/api'

import { comparisonFileEndpoints, comparisonPageEndpoints, comparisonPairEndpoints } from './endpoints'
import {
  ComparisonAllPairsPayload,
  ComparisonFileResponse,
  ComparisonFilesPagesResponse,
  ComparisonOutlineResponse,
  ComparisonPairPayload,
  FilePagesPayload,
} from './interfaces'

const uploadComparisonFile = async (comparisonId: number, payload: FormData): GetOneResponse<ComparisonFileResponse> =>
  (await axios.post(comparisonFileEndpoints.files(comparisonId), payload)).data

const putFilePages = async (
  comparisonId: number,
  comparisonFileId: number,
  payload: FilePagesPayload,
): GetArrayResponse<ComparisonFileResponse> =>
  (await axios.put(comparisonFileEndpoints.filesPages(comparisonId, comparisonFileId), payload)).data

export const comparisonFileApi = {
  uploadComparisonFile,
  putFilePages,
}

const getComparisonFilesPages = async (
  comparisonId: number,
  isReference?: boolean,
): GetOneResponse<ComparisonFilesPagesResponse> =>
  (
    await axios.get(comparisonPageEndpoints.filesPages(comparisonId), {
      params: {
        isReference,
      },
    })
  ).data

const deletePage = async (comparisonId: number, pageId: number): GetOneResponse<ComparisonFileResponse> =>
  (await axios.delete(comparisonPageEndpoints.delete(comparisonId, pageId))).data.data

const highlightPageOutline = async (comparisonId: number, pageId: number): GetOneResponse<ComparisonOutlineResponse> =>
  (await axios.post(comparisonPageEndpoints.outline(comparisonId, pageId))).data.data

export const comparisonPageApi = {
  getComparisonFilesPages,
  deletePage,
  highlightPageOutline,
}

const getPairs = async (comparisonId: number): GetArrayResponse<ComparisonPairResponse> =>
  (await axios.get(comparisonPairEndpoints.pairs(comparisonId))).data

const createPair = async (
  comparisonId: number,
  payload: ComparisonPairPayload,
): GetOneResponse<ComparisonPairResponse> =>
  (await axios.post(comparisonPairEndpoints.pairs(comparisonId), payload)).data.data

const deletePair = async (comparisonId: number, pairId: number): GetOneResponse<string> =>
  (await axios.delete(comparisonPairEndpoints.delete(comparisonId, pairId))).data.data

const recreatePagesPairs = async (
  comparisonId: number,
  payload: ComparisonAllPairsPayload,
): GetArrayResponse<ComparisonPairResponse> =>
  (await axios.post(comparisonPairEndpoints.reCreate(comparisonId), payload)).data.data

export const comparisonPairApi = {
  getPairs,
  createPair,
  deletePair,
  recreatePagesPairs,
}

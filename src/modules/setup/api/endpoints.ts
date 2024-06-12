import { OneParamEndpointConstructor, TwoParamEndpointConstructor } from 'interfaces/api.interfaces'

interface ComparisonFilesEndpoints {
  files: OneParamEndpointConstructor
  filesPages: TwoParamEndpointConstructor
}

export const comparisonFileEndpoints: ComparisonFilesEndpoints = {
  files: (comparisonId) => `/comparisons/${comparisonId}/files`,
  filesPages: (comparisonId, comparisonFileId) => `/comparisons/${comparisonId}/files/${comparisonFileId}/pages`,
}

interface ComparisonPageEndpoints {
  filesPages: OneParamEndpointConstructor
  delete: TwoParamEndpointConstructor
  outline: TwoParamEndpointConstructor
}

export const comparisonPageEndpoints: ComparisonPageEndpoints = {
  filesPages: (comparisonId) => `/comparisons/${comparisonId}/files-pages`,
  delete: (comparisonId, pageId) => `/comparisons/${comparisonId}/files-pages/${pageId}`,
  outline: (comparisonId, pageId) => `/comparisons/${comparisonId}/files-pages/${pageId}/outline`,
}

interface ComparisonPairEndpoints {
  pairs: OneParamEndpointConstructor
  delete: TwoParamEndpointConstructor
  reCreate: OneParamEndpointConstructor
}

export const comparisonPairEndpoints: ComparisonPairEndpoints = {
  pairs: (comparisonId) => `/comparisons/${comparisonId}/pairs`,
  delete: (comparisonId, pairId) => `/comparisons/${comparisonId}/pairs/${pairId}`,
  reCreate: (comparisonId) => `/comparisons/${comparisonId}/pairs/create-all`,
}

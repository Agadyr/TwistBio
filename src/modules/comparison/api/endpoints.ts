import { OneParamEndpointConstructor } from 'interfaces/api.interfaces'

interface ComparisonEndpoints {
  get: OneParamEndpointConstructor
  analyze: OneParamEndpointConstructor
  patch: OneParamEndpointConstructor
  getReport: OneParamEndpointConstructor
  downloadReport: OneParamEndpointConstructor
  sendReport: OneParamEndpointConstructor
}

export const comparisonEndpoints: ComparisonEndpoints = {
  get: (comparisonId) => `/comparisons/${comparisonId}`,
  getReport: (comparisonId) => `/comparisons/${comparisonId}/report`,
  analyze: (comparisonId) => `/comparisons/${comparisonId}/analysis`,
  patch: (comparisonId) => `/comparisons/${comparisonId}`,
  downloadReport: (comparisonId) => `/comparisons/${comparisonId}/download_report`,
  sendReport: (comparisonId) => `/comparisons/${comparisonId}/send_report`,
}

import { OneParamEndpointConstructor } from 'interfaces/api.interfaces'

interface ComparisonEndpoints {
  get: OneParamEndpointConstructor
  analyze: OneParamEndpointConstructor
}

export const comparisonEndpoints: ComparisonEndpoints = {
  get: (comparisonId) => `/comparisons/${comparisonId}`,
  analyze: (comparisonId) => `/comparisons/${comparisonId}/analysis`,
}

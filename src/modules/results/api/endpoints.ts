import {
  FourParamEndpointConstructor,
  NoParamEndpointConstructor,
  ThreeParamEndpointConstructor,
  TwoParamEndpointConstructor,
} from 'interfaces/api.interfaces'

interface ComparisonErrorEndpoints {
  severities: NoParamEndpointConstructor
  statuses: NoParamEndpointConstructor
  types: NoParamEndpointConstructor
  pairErrors: TwoParamEndpointConstructor
  errorDetail: ThreeParamEndpointConstructor
  updateError: ThreeParamEndpointConstructor
}

export const comparisonErrorEndpoints: ComparisonErrorEndpoints = {
  severities: () => '/comparisons/error-severities',
  statuses: () => '/comparisons/error-statuses',
  types: () => '/comparisons/error-types',
  pairErrors: (comparisonId, pairId) => `/comparisons/${comparisonId}/pairs/${pairId}/errors`,
  errorDetail: (comparisonId, pairId, errorId) => `/comparisons/${comparisonId}/pairs/${pairId}/errors/${errorId}`,
  updateError: (comparisonId, pairId, errorId) => `/comparisons/${comparisonId}/pairs/${pairId}/errors/${errorId}`,
}

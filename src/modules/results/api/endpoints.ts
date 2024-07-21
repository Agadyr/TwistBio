import {
  NoParamEndpointConstructor,
  OneParamEndpointConstructor,
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
interface ComparisonReportEndpoint {
  postComparisonReport: OneParamEndpointConstructor
}
export const postComparisonReportEndpoint: ComparisonReportEndpoint = {
  postComparisonReport: (comparisonId) => `/comparisons/${comparisonId}/create_report`,
}
export const comparisonErrorEndpoints: ComparisonErrorEndpoints = {
  severities: () => '/comparisons/error-severities',
  statuses: () => '/comparisons/error-statuses',
  types: () => '/comparisons/error-types',
  pairErrors: (comparisonId, pairId) => `/comparisons/${comparisonId}/pairs/${pairId}/errors`,
  errorDetail: (comparisonId, pairId, errorId) => `/comparisons/${comparisonId}/pairs/${pairId}/errors/${errorId}`,
  updateError: (comparisonId, pairId, errorId) => `/comparisons/${comparisonId}/pairs/${pairId}/errors/${errorId}`,
}

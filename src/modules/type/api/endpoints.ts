import { NoParamEndpointConstructor, OneParamEndpointConstructor } from 'interfaces/api.interfaces'

interface ComparisonEndpoints {
  stages: NoParamEndpointConstructor
  create: NoParamEndpointConstructor
  update: OneParamEndpointConstructor
}

export const comparisonEndpoints: ComparisonEndpoints = {
  stages: () => '/comparison/stages',
  create: () => '/comparisons',
  update: (comparisonId) => `/comparisons/${comparisonId}`,
}

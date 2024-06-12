type EndpointParam = string | number | undefined

export type NoParamEndpointConstructor = () => string
export type OneParamEndpointConstructor = (param1: EndpointParam) => string
export type TwoParamEndpointConstructor = (param1: EndpointParam, param2: EndpointParam) => string
export type ThreeParamEndpointConstructor = (
  param1: EndpointParam,
  param2: EndpointParam,
  param3: EndpointParam,
) => string
export type FourParamEndpointConstructor = (
  param1: EndpointParam,
  param2: EndpointParam,
  param3: EndpointParam,
  param4: EndpointParam,
) => string
export type GetOneResponse<T> = Promise<T>
export type GetArrayResponse<T> = Promise<T[]>

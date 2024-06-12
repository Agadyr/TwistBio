import Axios, { AxiosRequestConfig } from 'axios'
import { API_URL, isTest } from 'constants/env'
import {
  headersJson,
  paramsSerializerToSnakeCaseArrayBrackets,
  transformRequestToSnakeCase,
  transformResponseToCamelCase,
} from 'packages/api'

const axios = Axios.create({
  baseURL: API_URL,
  paramsSerializer: paramsSerializerToSnakeCaseArrayBrackets,
  transformResponse: transformResponseToCamelCase,
  transformRequest: transformRequestToSnakeCase,
  headers: headersJson,
} as unknown as AxiosRequestConfig)

if (isTest) {
  axios.defaults.adapter = require('axios/lib/adapters/http')
}

export { axios }

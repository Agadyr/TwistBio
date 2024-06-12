import { CropRatio } from 'interfaces/common.interfaces'
import { FilePathWithPageNumber } from 'modules/comparison/api'

export interface FilePagesPayload {
  pageNumbers: number[]
}

export interface ComparisonFilePayload {
  isReference: boolean
  file: string
}

export interface ComparisonFileResponse {
  id: number
  previewFullUrl: string
}

export interface ComparisonFilesPagesResponse {
  items: ComparisonOutlineResponse[]
  count: number
}

export interface ComparisonOutlineResponse extends FilePathWithPageNumber {
  id: number
}

export interface ComparisonPairPayload {
  referencePageId: number
  referencePageExcludeFooterHeader: boolean
  referencePageCropRatio: CropRatio
  samplePageId: number
  samplePageExcludeFooterHeader: boolean
  samplePageCropRatio: CropRatio
}

export interface ReferencePageWithId {
  id: number
  excludeFooterHeader: boolean
  cropRatio: CropRatio
}

export interface ComparisonAllPairsPayload {
  pages: ReferencePageWithId[]
}

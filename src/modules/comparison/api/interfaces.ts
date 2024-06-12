import { CropRatio, TypeofComparison } from 'interfaces/common.interfaces'
import { DateFormat } from 'interfaces/components.interfaces'

export interface Author {
  id: string
  email: string
}

export interface StageResponse {
  id: number
  name: string
  uploadType: string
  instructionSetType: string
  comparisonType: TypeofComparison.Pixel | TypeofComparison.Text
}

export interface ComparisonResponse {
  id: number
  author: Author
  createdAt: DateFormat
  number: number
  stage: StageResponse
  step: number
  updatedAt: DateFormat
}

export interface FilePathWithPageNumber {
  previewFullUrl: string
  number: number
}

export interface ReferencePage extends FilePathWithPageNumber {
  excludeFooterHeader: boolean
  cropRatio: CropRatio
  previewMlCroppedFullUrl: string
}

export interface ComparisonPairResponse {
  id: number
  referencePage: ReferencePage
  samplePage: ReferencePage
}

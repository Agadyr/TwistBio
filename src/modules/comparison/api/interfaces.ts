import { CropRatio, TypeofComparison } from 'interfaces/common.interfaces'
import { DateFormat } from 'interfaces/components.interfaces'
import { ComparisonPairError } from 'modules/results/api'

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

export interface Page {
  id: number
  number: number
  previewFullUrl?: string | null
}

export interface Stage {
  id: number
  name: string
  uploadType: string
  instructionSetType: string
  comparisonType: string
}

export interface Pair {
  id: number
  maskFullUrl: string
  outlineMaskFullUrl: string
  referenceColorMaskFullUrl: string | null
  referencePreviewMlCroppedFullUrl: string | null
  sampleColorMaskFullUrl: string | null
  samplePreviewMlCroppedFullUrl: string | null
  referencePage: Page
  samplePage: Page
  errors: ComparisonPairError[]
}
export interface CountErrors {
  medium: number
  high: number
  barCodeErr: number
  barCodeCheck: number
}

export interface Evaluation {
  id: string
  number: string
  name: string
  pairs: Pair[]
  comment: string
  evaluation: string
  createdAt: string
  updatedAt: string
  author: Author
  stage: Stage
  step: number
  countErrorsType: CountErrors
}

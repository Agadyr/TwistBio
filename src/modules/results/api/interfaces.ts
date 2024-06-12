import { CropRatio } from 'interfaces/common.interfaces'

export interface ComparisonError {
  id: number
  name: string
  code: string
}

export interface ComparisonPairError {
  id: number
  number: number
  type: ComparisonError | null
  severity: ComparisonError | null
  status: ComparisonError | null
  comment: string | null
  reference_crop_ratio: CropRatio | null
  sample_crop_ratio: CropRatio | null
  content: string[] | null
  bestMatch: Array<string | null> | null
  detectedValue: string | null
  imageFullUrl: string | null
  imageCropRatio: CropRatio | null
}

export interface ComparisonPairErrors {
  id: number
  errors: ComparisonPairError[]
  maskFullUrl: string | null
  outlineMaskFullUrl: string | null
  referenceColorMaskFullUrl: string | null
  sampleColorMaskFullUrl: string | null
}

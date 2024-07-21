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
  referenceCropRatio?: CropRatio | null
  sample_crop_ratio: CropRatio | null
  sampleCropRatio?: CropRatio | null
  barcode_crop_ratio: CropRatio | null
  barcodeCropRatio?: CropRatio | null
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
export interface ComparisonReport {
  id: number
  preview_full_url: string
}

export interface SendReport {
  status: number
  message: string
}

import { UploadType } from 'modules/type/api'

export interface TypeBlockData {
  uploadType: UploadType
  packStage: number
  instructionStage: number
}

export type ComparisonFormData = TypeBlockData

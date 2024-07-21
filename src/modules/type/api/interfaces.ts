import { DateFormat } from 'interfaces/components.interfaces'
import { UploadTypes } from 'modules/type/constants/type'

//: типы и интерфейсы лучше хранить в раздельных файлах.
//Review: Думаю это из за того что это все относится к сравнению файлов .
export type UploadType = UploadTypes.Pack | UploadTypes.Instruction

export interface ComparisonType {
  id: number
  name: string
}

export interface Stage {
  stageId: number
}

export interface StageAndStep {
  stageId?: number
  step?: number
  name?: string
  number?: string
  comment?: string
  evaluation?: string
  partners?: number[]
}

export interface Author {
  id: string
  email: string
}

export interface StageResponse {
  id: number
  name: string
  uploadType: string
  instructionSetType: string
  comparisonType: string
}

export interface ComparisonCreationResponse {
  id: number
  author: Author
  createdAt: DateFormat
  number: number
  stage: StageResponse
  step: number
  updatedAt: DateFormat
}

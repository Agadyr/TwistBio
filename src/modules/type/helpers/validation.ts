import { object, string } from 'yup'

export const typeBlockSchema = object().shape({
  uploadType: string(),
  packStage: string(),
  instructionStage: string(),
})

import { object, string } from 'yup'

export const typeBlockSchema = object().shape({
  uploadType: string(),
  packType: string(),
  instructionType: string(),
})

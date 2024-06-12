import { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { Button, CircularProgress } from '@mui/material'
import { UploadTypes } from 'modules/type/constatns/type'

import classes from './TypeBlockNextStepButton.module.scss'

interface TypeBlockNextStepButtonProps {
  loading: boolean
}

export const TypeBlockNextStepButton: FC<TypeBlockNextStepButtonProps> = ({ loading }) => {
  const { watch } = useFormContext()

  const packStage = watch('packStage')
  const instructionStage = watch('instructionStage')
  const uploadType = watch('uploadType')

  const enabled = uploadType === UploadTypes.Pack ? uploadType && packStage : uploadType && instructionStage

  return (
    <Button className={classes.btn} disabled={!enabled} type="submit" variant="outlined">
      {loading ? <CircularProgress className={classes.loader} /> : 'Далее'}
    </Button>
  )
}

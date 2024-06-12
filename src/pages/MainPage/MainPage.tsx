import { toast } from 'react-toastify'

import { Box, Button } from '@mui/material'
import { useTitle } from 'ahooks'
import { UploadTypes } from 'modules/type/constatns/type'
import { useComparisonStages } from 'modules/type/queries/useComparisonStages'
import { useCreateComparison } from 'modules/type/queries/useCreateComparison'

import classes from './MainPage.module.scss'

export const MainPage = () => {
  useTitle('Biocad')

  const { comparisonStages } = useComparisonStages(UploadTypes.Pack)
  const { createComparison } = useCreateComparison()

  const onCreateComparison = () => {
    if (comparisonStages && comparisonStages.length) {
      createComparison({ stageId: comparisonStages[0].id })
    } else {
      toast('Сервер временно недоступен, обновите страницу или попробуйте позже')
    }
  }

  return (
    <Box className={classes.panel}>
      <Button onClick={onCreateComparison} variant="outlined">
        Сделать новое сравнение
      </Button>
    </Box>
  )
}

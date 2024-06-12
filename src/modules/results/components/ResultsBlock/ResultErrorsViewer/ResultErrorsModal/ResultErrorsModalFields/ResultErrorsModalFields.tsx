import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import { ResultSelect } from 'modules/results/components/ResultsBlock/ResultSelect'
import { ResultTextField } from 'modules/results/components/ResultsBlock/ResultTextField'
import { useComparisonErrorSeverities } from 'modules/results/queries/useComparisonErrorSeverities'
import { useComparisonErrorStatuses } from 'modules/results/queries/useComparisonErrorStatuses'
import { useComparisonErrorTypes } from 'modules/results/queries/useComparisonErrorTypes'

import classes from './ResultErrorsModalFields.module.scss'

interface ResultErrorsModalProps {
  error: any
}
export const ResultErrorsModalFields: FC<ResultErrorsModalProps> = ({ error }) => {
  const { errorSeverities, errorSeveritiesRequestError } = useComparisonErrorSeverities()
  const { errorStatuses, errorStatusesRequestError } = useComparisonErrorStatuses()
  const { errorTypes, errorTypesRequestError } = useComparisonErrorTypes()
  console.log(error)
  return (
    <Box className={classes.fields}>
      {error.type.name !== 'Баркод' && error.type.name !== 'Штрихкод' && (
        <Box className={classes.selects}>
          <ResultSelect
            error={errorStatusesRequestError?.message}
            label={error.status ? error.status.name : 'Статус'}
            name="select1"
            selectOptions={errorStatuses}
          />
          <ResultSelect
            error={errorTypesRequestError?.message}
            label={error.type ? error.type.name : 'Тип'}
            name="select2"
            selectOptions={errorTypes}
          />
          <ResultSelect
            error={errorSeveritiesRequestError?.message}
            label={error.severity ? error.severity.name : 'Критичность'}
            name="select3"
            selectOptions={errorSeverities}
          />
        </Box>
      )}
      {(error.type.name === 'Баркод' || error.type.name === 'Штрихкод') && (
        <Box className={classes.selects2}>
          <ResultSelect
            error={errorStatusesRequestError?.message}
            label={error.status ? error.status.name : 'Статус'}
            name="select1"
            selectOptions={errorStatuses}
          />
          <ResultSelect
            error={errorTypesRequestError?.message}
            label={error.type ? error.type.name : 'Тип'}
            name="select2"
            selectOptions={errorTypes}
          />
        </Box>
      )}
      <Typography variant="h6">Распознано: {error.detectedValue}</Typography>
      <ResultTextField error={undefined} name="comment" />
    </Box>
  )
}

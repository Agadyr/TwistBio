import { FC, useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Typography } from '@mui/material'
import { ResultSelect } from 'modules/results/components/ResultsBlock/ResultSelect'
import { ResultTextField } from 'modules/results/components/ResultsBlock/ResultTextField'
import { errorsSever, errorsStatus, errorsType, errorsTypeText } from 'modules/results/constatns/api'
import { useComparisonErrorSeverities } from 'modules/results/queries/useComparisonErrorSeverities'
import { useComparisonErrorStatuses } from 'modules/results/queries/useComparisonErrorStatuses'
import { useComparisonErrorTypes } from 'modules/results/queries/useComparisonErrorTypes'

import classes from './ResultErrorsModalFields.module.scss'

interface ResultErrorsModalProps {
  error: any
}

export const ResultErrorsModalFields: FC<ResultErrorsModalProps> = ({ error }) => {
  const methods = useForm({ defaultValues: { error } })

  const [currentError, setCurrentError] = useState(error)
  const [errorSeverities, setErrorSeverities] = useState(errorsSever)
  const [errorStatuses, setErrorStatuses] = useState(errorsStatus)
  const [errorTypes, setErrorTypes] = useState(errorsType)
  const [errorTypesText, setErrorTypesText] = useState(errorsTypeText)

  const { errorSeveritiesRequestError } = useComparisonErrorSeverities()
  const { errorStatusesRequestError } = useComparisonErrorStatuses()
  const { errorTypesRequestError } = useComparisonErrorTypes()

  useEffect(() => {
    setCurrentError(error)
    methods.reset({ error })
  }, [error, methods])

  useEffect(() => {
    setErrorSeverities(errorsSever)
    setErrorStatuses(errorsStatus)
    setErrorTypes(errorsType)
    setErrorTypesText(errorsTypeText)
  }, [])

  return (
    <FormProvider {...methods}>
      <Box className={classes.fields}>
        {(currentError.type.name === 'Объект' || currentError.type.name === 'Текст') && (
          <Box className={classes.selects}>
            <ResultSelect
              error={errorStatusesRequestError?.message}
              errorName="Статус"
              label={currentError.status ? currentError.status.name : ''}
              name="select1"
              selectOptions={errorStatuses}
            />
            <ResultSelect
              error={errorTypesRequestError?.message}
              errorName="Тип"
              label={currentError.type ? currentError.type.name : ''}
              name="select2"
              selectOptions={errorTypes}
            />
            <ResultSelect
              error={errorSeveritiesRequestError?.message}
              errorName="Критичность"
              label={currentError.severity ? currentError.severity.name : 'Не заполнено'}
              name="select3"
              selectOptions={errorSeverities}
            />
          </Box>
        )}
        {(currentError.type.name === 'Штрихкод (значение)' || currentError.type.name === 'Баркод (значение)') && (
          <>
            <Box className={classes.selects2}>
              <ResultSelect
                error={errorStatusesRequestError?.message}
                errorName="Статус"
                label={currentError.status ? currentError.status.name : ''}
                name="select1"
                selectOptions={errorStatuses}
              />
              <ResultSelect
                error={errorTypesRequestError?.message}
                errorName="Тип"
                label={currentError.type ? currentError.type.name : ''}
                name="select2"
                selectOptions={errorTypes}
              />
            </Box>
            <Typography style={{ marginBottom: '20px' }} variant="h6">
              Распознано: {currentError.detectedValue}
            </Typography>
          </>
        )}
        {(currentError.type.name === 'Баркод' || currentError.type.name === 'Штрихкод') && (
          <>
            <Box className={classes.selects}>
              <ResultSelect
                error={errorStatusesRequestError?.message}
                errorName="Статус"
                label={currentError.status ? currentError.status.name : ''}
                name="select1"
                selectOptions={errorStatuses}
              />
              <ResultSelect
                error={errorTypesRequestError?.message}
                errorName="Тип"
                label={currentError.type ? currentError.type.name : ''}
                name="select2"
                selectOptions={errorTypes}
              />
              <ResultSelect
                error={errorSeveritiesRequestError?.message}
                errorName="Критичность"
                label={currentError.severity ? currentError.severity.name : 'Не заполнено'}
                name="select3"
                selectOptions={errorSeverities}
              />
            </Box>
          </>
        )}
        {(currentError.type.name === 'Опечатка' ||
          currentError.type.name === 'Нет в эталоне' ||
          currentError.type.name === 'Нет в образце') && (
          <>
            <Box className={classes.selects}>
              <ResultSelect
                error={errorStatusesRequestError?.message}
                errorName="Статус"
                label={currentError.status ? currentError.status.name : ''}
                name="select1"
                selectOptions={errorStatuses}
              />
              <ResultSelect
                error={errorTypesRequestError?.message}
                errorName="Тип"
                label={currentError.type ? currentError.type.name : ''}
                name="select2"
                selectOptions={errorTypesText}
              />
              <ResultSelect
                error={errorSeveritiesRequestError?.message}
                errorName="Критичность"
                label={currentError.severity ? currentError.severity.name : 'Не заполнено'}
                name="select3"
                selectOptions={errorSeverities}
              />
            </Box>
          </>
        )}
        <ResultTextField error={undefined} label="Готово" name="comment" />
      </Box>
    </FormProvider>
  )
}

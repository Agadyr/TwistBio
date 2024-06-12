import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import { Box, Button, Modal, Typography } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { ComparisonStep, useHeader } from 'components/common/Header'
import { commonHeaders } from 'components/common/Header/constants/comparisonStep'
import { useInitForm } from 'config/rhf'
import { TypeofComparison } from 'interfaces/common.interfaces'
import { useComparison } from 'modules/comparison/queries'
import { ResultCheckboxField } from 'modules/results/components/ResultsBlock/ResultCheckboxField'
import { useResultErrors } from 'modules/results/store'
import { usefilterPairErrors } from 'modules/results/store/store'

import classes from './ResultFiltersModal.module.scss'

interface ResultFiltersProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  onChange: any
}

export const ResultFiltersModal: FC<ResultFiltersProps> = ({ openModal, setOpenModal, onChange }) => {
  const params = useParams({ from: '/_comparison/$comparisonId/results' })
  const { comparison } = useComparison(Number(params.comparisonId))
  const { comparisonId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const selectedPair = useResultErrors((state) => state.selectedPair)

  const { fetchErrors } = usefilterPairErrors((state) => ({
    fetchErrors: state.fetchErrors,
  }))

  const header =
    comparison?.stage.comparisonType === TypeofComparison.Text
      ? 'Анализ результатов текстового сравнения'
      : commonHeaders[ComparisonStep.Results]
  useHeader(ComparisonStep.Results, header)
  const methods = useInitForm<any>({
    // resolver: yupResolver(typeBlockSchema),
    defaultValues: {
      1: true,
      2: false,
      3: true,
      4: false,
      5: true,
      6: false,
      7: true,
      8: false,
      9: true,
      10: false,
      11: true,
    },
  })

  const { handleSubmit, reset } = methods

  const [selectAllFilters, setSelectAllFilters] = useState(false)

  useEffect(() => {
    if (selectAllFilters) {
      reset({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
        8: true,
        9: true,
        10: true,
        11: true,
      })
    } else {
      reset({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
      })
    }
  }, [selectAllFilters])

  const onSubmit: SubmitHandler<any> = (obj) => {
    const hasTrue = Object.values(obj).some((value) => value === true)
    if (hasTrue) {
      onChange(true)
    } else {
      const allFalse = Object.values(obj).every((value) => value === false)
      if (allFalse) {
        onChange(false)
      }
    }
    const typeIdInArray = Object.keys(obj)
      .filter((key) => Number(key) <= 7 && obj[key] === true)
      .join(',')
    const severityIdInInArray = Object.keys(obj)
      .filter((key) => Number(key) > 7 && obj[key] === true)
      .map((key) => {
        const numKey = Number(key)
        if (numKey === 8) {
          return 1
        }
        if (numKey === 9) {
          return 2
        }
        if (numKey === 10) {
          return 3
        }
        if (numKey === 11) {
          return ''
        }
        return numKey
      })
      .join(',')
    const data = {
      type_id__in: typeIdInArray || null,
      severity_id__in: severityIdInInArray || null,
    }
    fetchErrors(comparisonId, selectedPair, data)
    setOpenModal(false)
  }
  const onError = () => toast.error('Что то пошло не так, попробуйте еще раз.')

  return (
    <Modal onClose={() => setOpenModal(false)} open={openModal}>
      <Box className={classes.modal}>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <Box className={classes.top}>
              <Typography>Выберите фильтр</Typography>
              <Button onClick={() => setSelectAllFilters((prevState) => !prevState)} variant="outlined">
                Выбрать все
              </Button>
            </Box>

            <Box className={classes.center}>
              <Box className={classes.wrap}>
                <Typography paddingTop="9px">Тип ошибки</Typography>
                {comparison?.stage.comparisonType === 'попиксельное сравнение' && (
                  <Box className={classes.checkboxes}>
                    <ResultCheckboxField label="Объект" name="4" />
                    <ResultCheckboxField label="Текст" name="5" />
                    <ResultCheckboxField label="Баркод" name="6" />
                    <ResultCheckboxField label="Штрих-код" name="7" />
                  </Box>
                )}
                {comparison?.stage.comparisonType !== 'попиксельное сравнение' && (
                  <Box className={classes.checkboxes}>
                    <ResultCheckboxField label="Опечатка" name="1" />
                    <ResultCheckboxField label="Нет в эталоне" name="2" />
                    <ResultCheckboxField label="Нет в образце" name="3" />
                  </Box>
                )}
              </Box>

              <Box className={classes.wrap}>
                <Typography paddingTop="9px">Критичность</Typography>
                <Box className={classes.checkboxes}>
                  <ResultCheckboxField label="Высокая" name="8" />
                  <ResultCheckboxField label="Средняя" name="9" />
                  <ResultCheckboxField label="Низкая" name="10" />
                  <ResultCheckboxField label="Не заполнено" name="11" />
                </Box>
              </Box>
            </Box>

            <Box className={classes.bottom}>
              <button className="btn btngray" onClick={() => setOpenModal(false)}>
                Отмена
              </button>
              <button className="btn btn-purple mt-0" type="submit">
                Применить
              </button>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </Modal>
  )
}

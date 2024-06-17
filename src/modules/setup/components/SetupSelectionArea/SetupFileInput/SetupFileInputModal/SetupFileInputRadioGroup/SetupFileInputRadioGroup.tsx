import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'

import { Box, Button, FormControlLabel, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import axios from 'axios'
import { ComparisonFileResponse } from 'modules/setup/api'
import { checkTextFieldValue } from 'modules/setup/helpers/checkTextFieldValue'
import { convertToArrayOfNumbers } from 'modules/setup/helpers/convertToArrayOfNumbers'
import { convertToPagesArray } from 'modules/setup/helpers/convertToPagesArray'
import { PagesUploadVariants } from 'modules/setup/interfaces/setup'
import { useSendFilePages } from 'modules/setup/queries'
import { useComparisonFilesPages } from 'modules/setup/queries/useComparisonFilesPages'

import classes from './SetupFileInputRadioGroup.module.scss'

interface SetupFileInputRadioGroupProps {
  pageAmount: number
  setOpenModal: Dispatch<SetStateAction<boolean>>
  fileResponse?: ComparisonFileResponse
}

export const SetupFileInputRadioGroup: FC<SetupFileInputRadioGroupProps> = ({
  pageAmount,
  setOpenModal,
  fileResponse,
}) => {
  const [radioGroupValue, setRadioGroupValue] = useState<PagesUploadVariants>('all')
  const [textFieldValue, setTextFieldValue] = useState('')

  const [error, setError] = useState('')

  const params = useParams({ from: '/_comparison/$comparisonId/setup' })
  const comparisonId = Number(params.comparisonId)
  const { sendFilePages } = useSendFilePages(comparisonId)
  const { filesPages, refetchFilesPages } = useComparisonFilesPages(comparisonId, false)
  const uploadFiles = async () => {
    if (error || !fileResponse) {
      return
    }
    let pageNumbers: number[] = []
    if (radioGroupValue === 'all') {
      pageNumbers = convertToPagesArray(pageAmount)
    } else {
      pageNumbers = convertToArrayOfNumbers(textFieldValue)

      if (!pageNumbers.length || !textFieldValue) {
        setError('Ошибка: Вы ничего не выбрали')
        return
      }
    }
    try {
      const response = await axios.get(fileResponse?.previewFullUrl, {
        responseType: 'arraybuffer',
      })
      const contentType = response.headers['content-type']
      if (contentType.includes('image/')) {
        refetchFilesPages()
        setOpenModal(false)
        setTextFieldValue('')
      } else {
        sendFilePages({ comparisonFileId: fileResponse.id, payload: { pageNumbers } })
        setOpenModal(false)
        setTextFieldValue('')
      }
    } catch (errorRes) {
      console.log(errorRes)
    }
  }

  useEffect(() => {
    if (textFieldValue) {
      setError(checkTextFieldValue(textFieldValue, pageAmount))
    }
  }, [textFieldValue])

  return (
    <Box className={classes.controls}>
      <Box>
        <Typography component="p" marginBottom={2}>
          Выберите страницы для загрузки
        </Typography>
        <RadioGroup
          name="comparisonGroup"
          onChange={(event) => setRadioGroupValue(event.target.value as PagesUploadVariants)}
          value={radioGroupValue}
        >
          <FormControlLabel control={<Radio />} label="загрузить все" value="all" />

          <FormControlLabel control={<Radio />} label="загрузить выбранные" value="selected" />
          <TextField
            disabled={radioGroupValue !== 'selected'}
            error={!!error}
            helperText={error}
            onChange={(event) => setTextFieldValue(event.target.value.trim())}
            placeholder="1-4,6"
            value={textFieldValue}
            variant="outlined"
          />
        </RadioGroup>
      </Box>
      <Box display="flex" gap={2}>
        <Button color="error" onClick={() => setOpenModal(false)} variant="outlined">
          Отмена
        </Button>
        <Button onClick={uploadFiles} variant="outlined">
          Добавить
        </Button>
      </Box>
    </Box>
  )
}

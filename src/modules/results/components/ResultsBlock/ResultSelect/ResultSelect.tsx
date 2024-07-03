import { FC, ReactNode, useEffect, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { ComparisonError } from 'modules/results/api'

interface ResultSelectProps {
  name: string
  label: string
  error: ReactNode
  errorName: string
  selectOptions?: ComparisonError[]
}

export const ResultSelect: FC<ResultSelectProps> = ({ name, label, error, selectOptions = [], errorName }) => {
  const { control, setValue } = useFormContext()
  const [labelState, setlabelState] = useState<boolean | null>(false)

  const currentError = useWatch({ control, name: 'error' })

  useEffect(() => {
    setValue(name, '')
  }, [currentError, setValue, name])
  useEffect(() => {
    if (label === 'Штрихкод (значение)') {
      setlabelState(true)
    } else if (label === 'Баркод (значение)') {
      setlabelState(true)
    }
  }, [label, error])
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {errorName === 'Статус' ? '' : errorName}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value = '' } }) => (
          <FormControl error={!!error} variant="filled">
            <InputLabel>{label}</InputLabel>
            <Select
              disabled={labelState ? true : false}
              onChange={(event) => onChange(event.target.value)}
              sx={{ width: 240 }}
              value={value}
            >
              {selectOptions.map((option) => (
                <MenuItem key={option.code} value={option.code}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{error}</FormHelperText>
          </FormControl>
        )}
      />
    </div>
  )
}

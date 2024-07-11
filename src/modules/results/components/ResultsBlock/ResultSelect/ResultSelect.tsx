import { FC, ReactNode, useEffect, useState } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
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
  const [labelState, setLabelState] = useState<boolean>(false)
  const [showLabel, setShowLabel] = useState<boolean>(true)
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false)

  const currentError = useWatch({ control, name: 'error' })

  useEffect(() => {
    setValue(name, '')
    setShowLabel(true)
  }, [currentError, setValue, name])

  useEffect(() => {
    if (label === 'Штрихкод (значение)' || label === 'Баркод (значение)') {
      setLabelState(true)
    }
  }, [label])

  const handleSelectChange = (event: SelectChangeEvent<any>) => {
    setValue(name, event.target.value as string)
    setShowLabel(false)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {errorName !== 'Статус' && errorName}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value = '' } }) => (
          <FormControl
            error={!!error}
            sx={{
              '& .MuiSelect-select:focus': {
                backgroundColor: 'transparent',
              },
              '& .MuiFilledInput-underline:after': {
                borderBottom: isSelectOpen ? '' : 'none',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: !isSelectOpen ? '#00000099' : '',
              },
            }}
          >
            <InputLabel shrink={false} sx={{ paddingTop: '8px' }} variant="filled">
              {showLabel ? label : ''}
            </InputLabel>
            <Select
              disabled={labelState}
              onChange={(event) => {
                onChange(event.target.value)
                handleSelectChange(event)
              }}
              onClose={() => setIsSelectOpen(false)}
              onOpen={() => setIsSelectOpen(true)}
              sx={{
                width: 240,
                paddingBottom: '10px',
                '&:before, &:after': {
                  borderBottom: 'none !important',
                },
              }}
              value={value}
              variant="filled"
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

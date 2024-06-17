import { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

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
  const { control } = useFormContext()
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {errorName}
      <Controller
        control={control}
        defaultValue={label || ''}
        name={name}
        render={({ field: { onChange, value = '' } }) => (
          <FormControl error={!!error} variant="filled">
            <InputLabel>{label}</InputLabel>
            <Select
              disabled={label === 'Штрихкод' ? true : false}
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

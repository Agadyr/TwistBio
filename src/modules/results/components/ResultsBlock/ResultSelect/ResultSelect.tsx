import { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material'
import { ComparisonError } from 'modules/results/api'

interface ResultSelectProps {
  name: string
  label: string
  error: ReactNode
  selectOptions?: ComparisonError[]
}

export const ResultSelect: FC<ResultSelectProps> = ({ name, label, error, selectOptions = [] }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl error={!!error} variant="filled">
          <InputLabel>{label}</InputLabel>
          <Select onChange={(event) => onChange(event.target.value)} sx={{ width: 240 }} value={value}>
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
  )
}

import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material'
import { ComparisonType } from 'modules/type/api'

interface TypeBlockPackSelectProps {
  name: string
  disabled: boolean
  error: string
  selectValues?: ComparisonType[]
}

export const TypeBlockSelect: FC<TypeBlockPackSelectProps> = ({ name, disabled, error, selectValues = [] }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl disabled={disabled} error={!!error} variant="filled">
          <Select onChange={(event) => onChange(event.target.value)} value={value}>
            {selectValues.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>{error}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

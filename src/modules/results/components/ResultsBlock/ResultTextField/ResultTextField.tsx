import { FC, ReactNode } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { FormControl, TextField } from '@mui/material'

interface ResultTextFieldProps {
  name: string
  label?: string
  error: ReactNode
}

export const ResultTextField: FC<ResultTextFieldProps> = ({ name, error, label }) => {
  const { control } = useFormContext()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControl variant="filled">
          <TextField
            error={!!error}
            helperText={error}
            label={label}
            onChange={onChange}
            sx={{ width: 800 }}
            value={value}
            variant="outlined"
          />
        </FormControl>
      )}
    />
  )
}

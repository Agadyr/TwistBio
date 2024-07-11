import { FC, ReactNode, useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

import { Box, FormControl, TextField, Typography } from '@mui/material'

interface ResultTextFieldProps {
  name: string
  label?: string
  error: ReactNode
}

export const ResultTextField: FC<ResultTextFieldProps> = ({ name, error, label }) => {
  const { control, setValue } = useFormContext()

  const currentError = useWatch({ control, name: 'error' })

  useEffect(() => {
    setValue(name, '')
  }, [currentError, setValue, name])

  return (
    <Box alignItems="center" display="flex" gap="20px">
      <Typography variant="body1">Комментарий</Typography>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <FormControl sx={{ flex: 1 }} variant="filled">
            <TextField
              error={!!error}
              helperText={error}
              label={label}
              onChange={onChange}
              sx={{ width: 1100 }}
              value={value}
              variant="outlined"
            />
          </FormControl>
        )}
      />
    </Box>
  )
}

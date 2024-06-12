import { FC } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import { Checkbox, FormControlLabel } from '@mui/material'

interface FormCheckboxFieldProps {
  name: string
  label: string
}

export const ResultCheckboxField: FC<FormCheckboxFieldProps> = ({ name, label }) => {
  const { control } = useFormContext()
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <FormControlLabel control={<Checkbox checked={value} onChange={onChange} />} label={label} />
      )}
    />
  )
}

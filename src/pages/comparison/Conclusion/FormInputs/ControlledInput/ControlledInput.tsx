import { FC, useEffect, useState } from 'react'
import { Control, Controller } from 'react-hook-form'

import { Box, TextField, Typography } from '@mui/material'

import classes from './ControlledInput.module.scss'

interface ControlledInputProps {
  name: string
  label: string
  control: Control<any>
}

export const ControlledInput: FC<ControlledInputProps> = ({ name, label, control }) => {
  const [size, setSize] = useState<string | number | undefined>(undefined)
  useEffect(() => {
    if (name === 'number') {
      setSize('150px')
    } else if (name === 'comment' || name === 'evaluation') {
      setSize('70%')
    }
  }, [name])
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Box className={classes.Control}>
          <Typography mr={2} sx={{ width: '250px' }} variant="body1">
            {label}:
          </Typography>
          <TextField {...field} sx={{ width: size }} />
        </Box>
      )}
    />
  )
}

export default ControlledInput

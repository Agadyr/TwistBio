import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { Box, Button, Typography } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { FormData } from 'pages/comparison/Conclusion/interfaces/conclusionblock'

import { ControlledInput } from './ControlledInput'
import classes from './FormInputs.module.scss'

interface FormInputsProps {
  onSubmit: (data: FormData) => void
}

export const FormInputs: FC<FormInputsProps> = ({ onSubmit }) => {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: '',
      number: '',
      comment: '',
      evaluation: '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h5">Введите данные о сравнении</Typography>
      <ControlledInput control={control} label="Наименование проекта" name="name" />
      <ControlledInput control={control} label="Номер партии" name="number" />
      <ControlledInput control={control} label="Заключительный комментарий" name="comment" />
      <ControlledInput control={control} label="Оценка сравнения" name="evaluation" />
      <Box className={classes.links}>
        <Button className="btn btn-purple" variant="outlined">
          <Link params to="/$comparisonId/results">
            Назад
          </Link>
        </Button>
        <Button className="btn btn-purple" type="submit" variant="outlined">
          Перейти ко всем отчетам
        </Button>
      </Box>
    </form>
  )
}

export default FormInputs

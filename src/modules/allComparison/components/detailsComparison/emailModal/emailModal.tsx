import { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Button, Modal, TextField, Typography } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { useSendReport } from 'modules/comparison/queries/useSendReport'

import classes from './emailModal.module.scss'

interface Props {
  sendEmailModal: boolean
  setSendEmailModal: (open: boolean) => void
}

interface IForm {
  'e-mail': string
}

export const SendEmailModal: FC<Props> = ({ setSendEmailModal, sendEmailModal }) => {
  const params = useParams({ from: '/$compId/about' })
  const { send } = useSendReport(params.compId)
  const { register, handleSubmit, formState } = useForm<IForm>({
    mode: 'onChange',
  })

  const emailError = formState.errors['e-mail']?.message

  const onSubmit: SubmitHandler<IForm> = (data) => {
    send(data['e-mail'])
  }
  return (
    <Modal
      aria-describedby="keep-mounted-modal-description"
      aria-labelledby="keep-mounted-modal-title"
      keepMounted
      onClose={() => setSendEmailModal(false)}
      open={sendEmailModal}
    >
      <form action="" className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Typography sx={{ textAlign: 'center' }} variant="h5">
          Введите почту
        </Typography>
        <TextField
          placeholder="Напишите e-mail"
          type="text"
          {...register('e-mail', {
            required: 'Это поле обязательно для заполнения',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'Не правильный e-mail',
            },
          })}
        />
        {emailError && <Typography className={classes.emailError}>{emailError}</Typography>}
        <Button className="btn btn-purple" type="submit" variant="outlined">
          Отправить
        </Button>
      </form>
    </Modal>
  )
}

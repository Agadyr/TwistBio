import { Dispatch, FC, SetStateAction } from 'react'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { toast } from 'react-toastify'

import { faClose } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Modal, Typography } from '@mui/material'
import { useInitForm } from 'config/rhf'

import classes from './ResultErrorsModal.module.scss'
import { ResultErrorsModalButtons } from './ResultErrorsModalButtons'
import { ResultErrorsModalFields } from './ResultErrorsModalFields'
import { ResultErrorsModalImages } from './ResultErrorsModalImages'

interface ResultErrorsModalProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  error: any
  onChangeError: any
}

export const ResultErrorsModal: FC<ResultErrorsModalProps> = ({ openModal, setOpenModal, error, onChangeError }) => {
  const methods = useInitForm<any>({})

  const { handleSubmit } = methods
  const onSubmit: SubmitHandler<any> = (obj) => {}
  const onError = () => toast.error('Что то пошло не так, попробуйте еще раз.')
  return (
    <Modal onClose={() => setOpenModal(false)} open={openModal}>
      <Box className={classes.modal}>
        <FontAwesomeIcon className={classes.faClose} icon={faClose} onClick={() => setOpenModal(false)} />
        <Typography variant="h5">№{error.number}</Typography>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <ResultErrorsModalImages error={error} />
            <ResultErrorsModalFields error={error} />
            <ResultErrorsModalButtons onChangeError={onChangeError} />
          </form>
        </FormProvider>
      </Box>
    </Modal>
  )
}

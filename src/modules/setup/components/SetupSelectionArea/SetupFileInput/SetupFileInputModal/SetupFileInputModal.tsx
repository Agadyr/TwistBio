import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Box, CircularProgress, Modal } from '@mui/material'
import { ComparisonFileResponse } from 'modules/setup/api'
import { pdfPreviewManager } from 'packages/pdfPreview'
import { Error } from 'ui/Error'

import classes from './SetupFileInputModal.module.scss'
import { SetupFileInputRadioGroup } from './SetupFileInputRadioGroup'
import { SetupFileInputSlider } from './SetupFileInputSlider'

interface SetupFileInputModalProps {
  openModal: boolean
  setOpenModal: Dispatch<SetStateAction<boolean>>
  fileResponse?: ComparisonFileResponse
  loading: boolean
  error: boolean
}

export const SetupFileInputModal: FC<SetupFileInputModalProps> = ({
  openModal,
  setOpenModal,
  fileResponse,
  loading,
  error,
}) => {
  const [pageAmount, setPageAmount] = useState(0)
  useEffect(() => {
    if (fileResponse?.previewFullUrl.includes('pdf')) {
      pdfPreviewManager
        .getPdfPages(fileResponse.previewFullUrl)
        .then(setPageAmount)
        .catch(() => toast.error('Не удалось загрузить превью страницы'))
    } else {
      return
    }
  }, [fileResponse])
  return (
    <Modal onClose={() => setOpenModal(false)} open={openModal}>
      <Box className={classes.modal}>
        {error ? (
          <Box className={classes.center}>
            <Error>Ошибка конвертации файла, попробуйте еще раз</Error>
          </Box>
        ) : (
          <>
            {loading ? (
              <Box className={classes.center}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <SetupFileInputRadioGroup
                  fileResponse={fileResponse}
                  pageAmount={pageAmount}
                  setOpenModal={setOpenModal}
                />
                <SetupFileInputSlider fileResponse={fileResponse} pageAmount={pageAmount} />
              </>
            )}
          </>
        )}
      </Box>
    </Modal>
  )
}

import { FC, useState } from 'react'

import { Box, Checkbox, FormControlLabel, Modal, Typography } from '@mui/material'
import { useSelectedPages } from 'modules/setup/store'

import classes from './SetupExcludeCheckbox.module.scss'

interface SetupExcludeCheckboxProps {
  isReference?: boolean
}

export const SetupExcludeCheckbox: FC<SetupExcludeCheckboxProps> = ({ isReference = false }) => {
  const [checked, setChecked] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const setExcludedFooterHeaderReference = useSelectedPages((state) => state.setExcludedFooterHeaderReference)
  const setExcludedFooterHeaderSample = useSelectedPages((state) => state.setExcludedFooterHeaderSample)

  const handleCheckboxChange = () => {
    setOpenModal(!checked)
    if (checked) {
      setOpenModal(true)
    }
  }

  const handleChangeVisibility = (confirm: boolean) => {
    setChecked(confirm)
    if (isReference) {
      setExcludedFooterHeaderReference(confirm)
    } else {
      setExcludedFooterHeaderSample(confirm)
    }
    setOpenModal(false)
  }

  return (
    <>
      <FormControlLabel
        className={classes.check}
        control={<Checkbox checked={checked} onChange={handleCheckboxChange} />}
        label="Исключить колонтитул/заголовки"
        labelPlacement={isReference ? 'end' : 'start'}
      />
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <Box className={classes.checkModal}>
          <Typography component="h5" paddingBottom={2} textAlign="center" variant="h6">
            Исключить колонтитул у всех страниц?
          </Typography>
          <Box className={classes.buttons}>
            <button
              className={`${classes.btngray} btn`}
              onClick={() => handleChangeVisibility(false)}
              style={{ width: '100%' }}
            >
              Нет
            </button>
            <button
              className={`${classes.btnpurple} btn`}
              onClick={() => handleChangeVisibility(true)}
              style={{ width: '100%' }}
            >
              Да
            </button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

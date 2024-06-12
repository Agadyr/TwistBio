import { FC, useState } from 'react'

import { Box, Button, Checkbox, FormControlLabel, Modal, Typography } from '@mui/material'

import classes from './SetupExcludeCheckbox.module.scss'

interface SetupExcludeCheckboxProps {
  isReference?: boolean
}

export const SetupExcludeCheckbox: FC<SetupExcludeCheckboxProps> = ({ isReference = false }) => {
  const [checked, setChecked] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const onCheckboxChange = () => {
    if (!checked) {
      // setOpenModal(true)
    }
    setChecked((value) => !value)
  }

  const onExcludeFooterHeader = () => {
    setOpenModal(false)
    setChecked(true)
  }

  return (
    <>
      <FormControlLabel
        className={classes.check}
        control={<Checkbox checked={checked} onChange={onCheckboxChange} />}
        label="Исключить колонтитул/заголовки"
        labelPlacement={isReference ? 'end' : 'start'}
      />
      <Modal onClose={() => setOpenModal(false)} open={openModal}>
        <Box className={classes.checkModal}>
          <Typography component="h4" paddingBottom={2} textAlign="center" variant="h6">
            Исключить колонтитул у всех страниц?
          </Typography>
          <Box className={classes.buttons}>
            <Button color="error" onClick={onExcludeFooterHeader} sx={{ width: 100 }} variant="outlined">
              Нет
            </Button>
            <Button onClick={onExcludeFooterHeader} sx={{ width: 100 }} variant="outlined">
              Да
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}

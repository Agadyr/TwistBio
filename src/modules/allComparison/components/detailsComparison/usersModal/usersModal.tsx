import { FC, useState } from 'react'
import { toast } from 'react-toastify'

import { Box, Button, Modal, Typography } from '@mui/material'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useParams } from '@tanstack/react-router'
import { Users } from 'constants/user'
import { useUpdateComparison } from 'modules/type/queries/useUpdateComparison'

import classes from './usersModal.module.scss'

interface User {
  id: number
  fullname: string
}

interface Props {
  usersModal: boolean
  setUsersModal: (open: boolean) => void
}
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 200,
    },
  },
}

export const UsersModal: FC<Props> = ({ setUsersModal, usersModal }) => {
  const { compId } = useParams({ from: '/$compId/about' })
  const numberComparisonId = Number(compId)
  const [personName, setPersonName] = useState<number[]>([])

  const onSuccessCreateComparison = () => {
    toast.success('Доступ дан успешно')
  }

  const { updateComparison } = useUpdateComparison(onSuccessCreateComparison, numberComparisonId)

  const handleSubmit = () => {
    updateComparison({
      comparisonId: numberComparisonId,
      payload: {
        partners: personName,
      },
    })
  }

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event
    setPersonName(typeof value === 'string' ? value.split(',').map(Number) : value)
  }
  return (
    <Modal
      aria-describedby="keep-mounted-modal-description"
      aria-labelledby="keep-mounted-modal-title"
      keepMounted
      onClose={() => setUsersModal(false)}
      open={usersModal}
    >
      <Box className={classes.modal}>
        <Typography variant="h4">Выберите пользователя</Typography>
        <FormControl className={classes.form}>
          <InputLabel id="demo-multiple-name-label">Пользователи</InputLabel>
          <Select
            id="demo-multiple-name"
            input={<OutlinedInput label="Пользователи" />}
            labelId="demo-multiple-name-label"
            MenuProps={MenuProps}
            multiple
            onChange={handleChange}
            renderValue={(selected) => {
              const selectedNames = Users.filter((user) => selected.includes(user.id)).map((user) => user.fullname)
              return selectedNames.join(', ')
            }}
            value={personName}
          >
            {Users.map((user: User) => (
              <MenuItem key={user.id} value={user.id}>
                {user.fullname}
              </MenuItem>
            ))}
          </Select>
          <Button className="btn btn-purple" onClick={handleSubmit} variant="outlined">
            Отправить
          </Button>
        </FormControl>
      </Box>
    </Modal>
  )
}

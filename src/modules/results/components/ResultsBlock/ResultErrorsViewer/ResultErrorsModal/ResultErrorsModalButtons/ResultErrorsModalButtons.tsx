import { FC } from 'react'

import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import { Box, Button } from '@mui/material'

import classes from './ResultErrorsModalButtons.module.scss'

interface ResultErrorsModalProps {
  onChangeError: any
}

export const ResultErrorsModalButtons: FC<ResultErrorsModalProps> = ({ onChangeError }) => (
  <Box className={classes.buttons}>
    <button className="btn btn-purple-bordered df jcsb aic" onClick={() => onChangeError('previous')}>
      <TrendingFlatIcon sx={{ transform: 'rotate(180deg)' }} /> &nbsp; Предыдущая
    </button>

    <button className="btn btngray">Сбросить изменения</button>
    <button className="btn btngray">Сохранить</button>

    <button className="btn btn-purple-bordered df jcsb aic" onClick={() => onChangeError('next')}>
      Следующая &nbsp; <TrendingFlatIcon />
    </button>
  </Box>
)

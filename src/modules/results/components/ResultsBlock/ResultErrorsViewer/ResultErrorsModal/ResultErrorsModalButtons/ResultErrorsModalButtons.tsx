import TrendingFlatIcon from '@mui/icons-material/TrendingFlat'
import { Box, Button } from '@mui/material'

import classes from './ResultErrorsModalButtons.module.scss'

export const ResultErrorsModalButtons = () => (
  <Box className={classes.buttons}>
    <button className="btn btn-purple-bordered df jcsb aic">
      <TrendingFlatIcon sx={{ transform: 'rotate(180deg)' }} /> &nbsp; Предыдущая
    </button>

    <button className="btn btngray">Сбросить изменения</button>
    <button className="btn btngray">Сохранить</button>

    <button className="btn btn-purple-bordered df jcsb aic">
      Следующая &nbsp; <TrendingFlatIcon />
    </button>
  </Box>
)

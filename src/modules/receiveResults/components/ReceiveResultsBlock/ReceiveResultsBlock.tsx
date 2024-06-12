import { Box, CircularProgress } from '@mui/material'

import classes from './ReceiveResultsBlock.module.scss'

export const ReceiveResultsBlock = () => (
  <Box className={classes.center}>
    <CircularProgress className={classes.loader} />
  </Box>
)

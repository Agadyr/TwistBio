import { Box } from '@mui/material'
import { Outlet } from '@tanstack/react-router'
import { Header } from 'components/common/Header'

import classes from './ComparisonLayout.module.scss'

export const ComparisonLayout = () => (
  <>
    <Box className={classes.panel}>
      <Header />
      <Outlet />
    </Box>
  </>
)

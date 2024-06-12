import { Box, Button } from '@mui/material'
import { Link } from '@tanstack/react-router'
import { ComparisonStep, useHeader } from 'components/common/Header'

import classes from './Conclusion.module.scss'

export const Conclusion = () => {
  useHeader(ComparisonStep.Conclusion)
  return (
    <Box className={classes.links}>
      <Button variant="outlined">
        <Link params to="/$comparisonId/results">
          Назад
        </Link>
      </Button>
      <Button variant="outlined">
        <Link to="/">Назад на главную</Link>
      </Button>
    </Box>
  )
}

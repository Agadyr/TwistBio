import { Box, Button, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from '@tanstack/react-router'
import { useComparisonAnalyze } from 'modules/comparison/queries'
import { SetupPagesPairs } from 'modules/setup/components/SetupPagesPairs'
import { SetupSelectionArea } from 'modules/setup/components/SetupSelectionArea'
import { useComparisonPagesPairs } from 'modules/setup/queries'

import classes from './SetupBlock.module.scss'

export const SetupBlock = () => {
  const params = useParams({ from: '/_comparison/$comparisonId/setup' })
  const { comparisonId } = params
  const numComparisonId = Number(comparisonId)
  const { comparisonPagesPairs } = useComparisonPagesPairs(numComparisonId)
  const { analyze, isAnalyzeLoading } = useComparisonAnalyze(comparisonId)
  const navigate = useNavigate()
  const startAnalyze = () => {
    if (!isAnalyzeLoading) {
      analyze()
    }
    navigate({ to: '/$comparisonId/receive-results', params })
  }

  return (
    <Box className={classes.container}>
      <Typography component="p" marginBottom={1} variant="h6">
        Выберите нужную страницу документа и зону для сравнения
      </Typography>

      <Box>
        <Box className={classes.comparisonZone}>
          <SetupSelectionArea comparisonId={numComparisonId} isReference />
          <SetupSelectionArea comparisonId={numComparisonId} />
        </Box>
        <SetupPagesPairs />
      </Box>

      <Box display="flex" gap={4}>
        <Button className={classes.next} variant="outlined">
          <Link params={params} to="/$comparisonId/type">
            Назад
          </Link>
        </Button>
        <Button
          className={classes.next}
          disabled={!comparisonPagesPairs || !comparisonPagesPairs.length || isAnalyzeLoading}
          onClick={startAnalyze}
          variant="outlined"
        >
          Получить результаты сравнения
        </Button>
      </Box>
    </Box>
  )
}

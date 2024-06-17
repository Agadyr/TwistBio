import { Error } from '@mui/icons-material'
import { Box, CircularProgress, Typography } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { useComparisonPagesPairs } from 'modules/setup/queries/useComparisonPagesPairs'
import { useDeletePagesPair } from 'modules/setup/queries/useDeletePagesPair'

import { SetupPagesPair } from './SetupPagesPair'
import classes from './SetupPagesPairs.module.scss'
import { SetupPagesPairsButtons } from './SetupPagesPairsButtons'

export const SetupPagesPairs = () => {
  const params = useParams({ from: '/_comparison/$comparisonId/setup' })
  const comparisonId = Number(params.comparisonId)

  const { comparisonPagesPairs, comparisonPagesPairsAreLoading, comparisonPagesPairsRequestError } =
    useComparisonPagesPairs(comparisonId)

  const { deletePair } = useDeletePagesPair()

  const removeFromComparison = (pageId: number) => {
    deletePair({ comparisonId, pageId })
  }
  return (
    <>
      <SetupPagesPairsButtons />
      <Typography>Добавлено к сравнению:</Typography>
      <Box className={classes.pairs}>
        {comparisonPagesPairsAreLoading && <CircularProgress />}
        {comparisonPagesPairsRequestError && <Error>Страниц нет</Error>}
        {comparisonPagesPairs &&
          comparisonPagesPairs?.length > 0 &&
          comparisonPagesPairs.map((pair) => (
            <SetupPagesPair key={pair.id} onRemove={() => removeFromComparison(pair.id)} pair={pair} />
          ))}
      </Box>
    </>
  )
}

import { Box, Button } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { initCropRatio } from 'modules/setup/constants/initCropRatio'
import { useComparisonPagesPairs, useReCreateAllPagesPairs } from 'modules/setup/queries'
import { useComparisonFilesPages } from 'modules/setup/queries/useComparisonFilesPages'
import { useCreatePagesPair } from 'modules/setup/queries/useCreatePagesPair'
import { useSelectedPages } from 'modules/setup/store/useSelectedPages'

import classes from './SetupPagesPairsButtons.module.scss'

export const SetupPagesPairsButtons = () => {
  const { removedPages, activePageIndex } = useSelectedPages()

  const params = useParams({ from: '/_comparison/$comparisonId/setup' })
  const comparisonId = Number(params.comparisonId)
  const { createPair } = useCreatePagesPair()

  const { recreatePagesPairs } = useReCreateAllPagesPairs()
  const { sample: samplePageId, reference: referencePageId } = useSelectedPages((state) => state.activePageIndex)
  const samplePageFrames = useSelectedPages((state) => state.samplePageFrames)
  const referencePageFrames = useSelectedPages((state) => state.referencePageFrames)
  const { filesPages: referenceFilePages } = useComparisonFilesPages(comparisonId, true)
  const { filesPages: sampleFilePages } = useComparisonFilesPages(comparisonId, false)
  const { comparisonPagesPairs } = useComparisonPagesPairs(comparisonId)
  const referencePages = referenceFilePages?.items || []
  const samplePages = sampleFilePages?.items || []

  const addToComparison = () => {
    createPair({
      comparisonId,
      pairData: {
        referencePageId,
        referencePageExcludeFooterHeader: false,
        referencePageCropRatio: referencePageFrames[referencePageId] || initCropRatio,
        samplePageId,
        samplePageExcludeFooterHeader: false,
        samplePageCropRatio: samplePageFrames[samplePageId] || initCropRatio,
      },
    })
  }

  const addToComparisonAllPages = () => {
    const referenceData = referencePages.map((page) => ({
      id: page.id,
      excludeFooterHeader: false,
      cropRatio: referencePageFrames[page.id] || initCropRatio,
    }))

    const sampleData = samplePages.map((page) => ({
      id: page.id,
      excludeFooterHeader: false,
      cropRatio: samplePageFrames[page.id] || initCropRatio,
    }))

    recreatePagesPairs({
      comparisonId,
      payload: {
        pages: [...referenceData, ...sampleData],
      },
    })
  }

  const canAddForComparison =
    activePageIndex.reference &&
    activePageIndex.sample &&
    !removedPages.reference.includes(activePageIndex.reference) &&
    !removedPages.sample.includes(activePageIndex.sample)

  const havePairs = comparisonPagesPairs && comparisonPagesPairs.length > 0
  const couldAddAll = referencePages.length !== 0 && referencePages.length === samplePages.length && !havePairs
  return (
    <Box className={classes.buttons}>
      <Button disabled={!canAddForComparison} onClick={addToComparison} variant="contained">
        Добавить к сравнению выбранные
      </Button>
      <Button disabled={!couldAddAll} onClick={addToComparisonAllPages} variant="contained">
        Добавить все к сравнению
      </Button>
    </Box>
  )
}

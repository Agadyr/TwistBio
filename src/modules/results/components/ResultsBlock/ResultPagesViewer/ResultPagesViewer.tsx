import { useEffect } from 'react'

import { Box } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import cx from 'clsx'
import { FilePreview } from 'components/common/FilePreview'
import { useResultErrors } from 'modules/results/store'
import { useComparisonPagesPairs } from 'modules/setup/queries'
import { useSelectedPages } from 'modules/setup/store'

import classes from './ResultPagesViewer.module.scss'

export const ResultPagesViewer = () => {
  const { selectedPair, setSelectedPair } = useResultErrors()
  const { comparisonId: stringId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const comparisonId = Number(stringId)
  const { comparisonPagesPairs } = useComparisonPagesPairs(comparisonId)
  const setIndexOfSlicePage = useSelectedPages((state) => state.setIndexOfSlicePage)

  useEffect(() => {
    const firstPair = comparisonPagesPairs?.[0]
    if (firstPair) {
      setSelectedPair(firstPair.id)
    }
  }, [comparisonPagesPairs])
  return (
    <Box className={classes.wrapper}>
      {comparisonPagesPairs &&
        comparisonPagesPairs.map(({ id, samplePage: { previewFullUrl, number } }, index) => (
          <Box
            className={cx(classes.imgWrap, { [classes.active]: id === selectedPair })}
            key={id}
            onClick={() => {
              setSelectedPair(id)
              setIndexOfSlicePage(index)
            }}
          >
            <span className={classes.number}>{index + 1}</span>
            <FilePreview
              className={cx(classes.img, { [classes.active]: index === selectedPair })}
              fileUrl={previewFullUrl}
              pageNum={number}
            />
          </Box>
        ))}
    </Box>
  )
}

import { useEffect } from 'react'

import { Box } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import cx from 'clsx'
import { FilePreview } from 'components/common/FilePreview'
import { useResultErrors } from 'modules/results/store'
import { useComparisonPagesPairs } from 'modules/setup/queries'

import classes from './ResultPagesViewer.module.scss'

export const ResultPagesViewer = () => {
  const { selectedPair, setSelectedPair } = useResultErrors()
  const { comparisonId: stringId } = useParams({ from: '/_comparison/$comparisonId/results' })
  const comparisonId = Number(stringId)
  const { comparisonPagesPairs } = useComparisonPagesPairs(comparisonId)

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
            onClick={() => setSelectedPair(id)}
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

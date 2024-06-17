import { FC, useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

import { Box, Button } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import cx from 'clsx'
import { FilePreview } from 'components/common/FilePreview'
import { useComparison } from 'modules/comparison/queries'
import { ComparisonOutlineResponse } from 'modules/setup/api'
import { initCropRatio } from 'modules/setup/constants/initCropRatio'
import { stagesWithoutFrame } from 'modules/setup/constants/setup'
import { useHighlightPageOutline } from 'modules/setup/queries/useHighlightPageOutline'
import { useSelectedPages } from 'modules/setup/store/useSelectedPages'
import { Frame } from 'ui/Frame'

import classes from './SetupPageViewer.module.scss'

interface Props {
  isReference?: boolean
  filesPages: ComparisonOutlineResponse[]
}

export const SetupPageViewer: FC<Props> = ({ isReference, filesPages }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  // const params = useParams({ from: '/_comparison/$comparisonId/setup' })
  // const comparisonId = Number(params.comparisonId)
  const areaType = isReference ? 'reference' : 'sample'
  const activePageId = useSelectedPages((state) => state.activePageIndex[areaType])
  const setPageFrame = useSelectedPages((state) =>
    isReference ? state.setReferencePageFrame : state.setSamplePageFrame,
  )
  const pageFrame =
    useSelectedPages((state) =>
      isReference ? state.referencePageFrames[activePageId] : state.samplePageFrames[activePageId],
    ) || initCropRatio
  const { highlightPageOutline } = useHighlightPageOutline()

  const removedPages = useSelectedPages((state) => state.removedPages[areaType])
  const isRemovedPage = removedPages.includes(activePageId)
  const activePage = filesPages.find((page) => page.id === activePageId)

  const params = useParams({ from: '/_comparison/$comparisonId/setup' })
  const comparisonId = Number(params.comparisonId)
  const { comparison, isComparisonLoading } = useComparison(comparisonId)
  const [withFrame, setWithFrame] = useState(true)

  useEffect(() => {
    if (!isReference || isComparisonLoading || !comparison?.stage.name) {
      return
    }

    setWithFrame(!stagesWithoutFrame.includes(comparison?.stage.name as string))
  }, [comparison?.stage.name, isComparisonLoading, isReference])
  const contentStyle = {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  }
  const contentStyle2 = {
    width: '100%',
    height: '100%',
  }
  return (
    <Box className={cx(classes.preview, { [classes.right]: !isReference })}>
      {activePage && (
        <>
          <Button
            className={`${classes.buttons} btn btn-purple`}
            onClick={() => highlightPageOutline({ pageId: activePageId, comparisonId })}
            size="small"
            variant="contained"
          >
            Выделить контур
          </Button>
          <TransformWrapper panning={{ lockAxisX: true, lockAxisY: true }}>
            <TransformComponent contentStyle={contentStyle}>
              <div className={classes.previewContainer}>
                <div className={classes.innerContainer} ref={containerRef}>
                  <FilePreview
                    className={cx(classes.previewImg, { [classes.removed]: isRemovedPage })}
                    fileUrl={activePage.previewFullUrl}
                    pageNum={activePage.number}
                  />
                </div>

                {withFrame && (
                  <Frame
                    cropRatio={pageFrame}
                    onFrameChange={(cropRatio) => {
                      setPageFrame(activePageId, cropRatio)
                    }}
                    refContainer={containerRef}
                    resizeable
                    scale={1}
                  />
                )}
              </div>
            </TransformComponent>
          </TransformWrapper>
        </>
      )}
    </Box>
  )
}

import { FC, useRef } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import { Box, IconButton } from '@mui/material'
import { useParams } from '@tanstack/react-router'
import { useVirtualizer } from '@tanstack/react-virtual'
import cx from 'clsx'
import { FilePreview } from 'components/common/FilePreview'
import { TypeofComparison } from 'interfaces/common.interfaces'
import { useComparison } from 'modules/comparison/queries'
import { ComparisonOutlineResponse } from 'modules/setup/api'
import { SetupFileInput } from 'modules/setup/components/SetupSelectionArea/SetupFileInput'
import { useComparisonPagesPairs } from 'modules/setup/queries'
import { useDeletePage } from 'modules/setup/queries/useDeletePage'
import { useSelectedPages } from 'modules/setup/store/useSelectedPages'

import classes from './SetupPagesViewer.module.scss'

interface SetupPagesViewerProps {
  isReference?: boolean
  accept?: string
  filesPages: ComparisonOutlineResponse[]
}

export const SetupPagesViewer: FC<SetupPagesViewerProps> = ({ accept, filesPages, isReference = false }) => {
  const { comparisonId } = useParams({ from: '/_comparison/$comparisonId/setup' })
  const { comparison } = useComparison(Number(comparisonId))
  const isTextComparison = comparison?.stage.comparisonType === TypeofComparison.Text
  const pagesListRef = useRef<HTMLDivElement | null>(null)
  const areaType = isReference ? 'reference' : 'sample'
  const { deletePage } = useDeletePage()
  const { refetchComparisonPages } = useComparisonPagesPairs(Number(comparisonId))
  const activePageId = useSelectedPages((state) => state.activePageIndex[areaType])
  const setActivePageIndex = useSelectedPages((state) => state.setActivePageIndex)
  const setIndexOfSlicePage = useSelectedPages((state) => state.setIndexOfSlicePage)
  const removePage = useSelectedPages((state) => state.removePage)
  const restorePage = useSelectedPages((state) => state.restorePage)
  const removedPages = useSelectedPages((state) => state.removedPages[areaType])

  const onPageClick = (page: number, isRemovedPage: boolean, index: number) => {
    if (isRemovedPage) {
      return
    }
    setActivePageIndex(page, isReference)
    if (isTextComparison && isReference) {
      setIndexOfSlicePage(index)
    }
  }

  const handleRemovePage = (id: number) => {
    removePage(id, isReference)
    deletePage(
      { comparisonId: Number(comparisonId), pageId: id },
      {
        onSuccess: () => {
          refetchComparisonPages()
        },
      },
    )
  }

  const filteredPages = isTextComparison && isReference ? filesPages.filter((page) => page.firstPage) : filesPages
  const rowVirtualizer = useVirtualizer({
    count: filteredPages.length,
    getScrollElement: () => pagesListRef.current,
    estimateSize: () => 200,
    overscan: 3,
  })

  return (
    <Box className={cx(classes.pages, { [classes.right]: !isReference })}>
      {filteredPages.length > 0 && (
        <Box className={classes.wrapper} ref={pagesListRef}>
          <div className={classes.virtualItems} style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {filteredPages.map((page, index) => {
              const virtualItem = rowVirtualizer.getVirtualItems()[index]
              if (!virtualItem) {
                return null
              }

              const { id, previewFullUrl, number } = page
              const isRemovedPage = removedPages.includes(id)
              return (
                <div
                  className={classes.virtualItem}
                  key={virtualItem.key}
                  style={{
                    height: `${virtualItem.size}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  <Box
                    className={cx(classes.imgWrap, {
                      [classes.active]: id === activePageId,
                      [classes.removed]: isRemovedPage,
                    })}
                    onClick={() => onPageClick(id, isRemovedPage, index)}
                  >
                    <span className={classes.number}>{virtualItem.index + 1}</span>
                    {isRemovedPage ? (
                      <IconButton className={classes.remove} onClick={() => restorePage(id, isReference)}>
                        <SettingsBackupRestoreIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        className={classes.remove}
                        onClick={(event) => {
                          event.stopPropagation()
                          handleRemovePage(id)
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    )}
                    <FilePreview className={classes.img} fileUrl={previewFullUrl} pageNum={number} />
                  </Box>
                </div>
              )
            })}
          </div>
        </Box>
      )}

      <SetupFileInput accept={accept} filesPages={filesPages} isReference={isReference} />
    </Box>
  )
}

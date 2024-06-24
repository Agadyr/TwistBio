import { FC, useRef } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore'
import { Box, IconButton } from '@mui/material'
import { useVirtualizer } from '@tanstack/react-virtual'
import cx from 'clsx'
import { FilePreview } from 'components/common/FilePreview'
import { ComparisonOutlineResponse } from 'modules/setup/api'
import { SetupFileInput } from 'modules/setup/components/SetupSelectionArea/SetupFileInput'
import { useSelectedPages } from 'modules/setup/store/useSelectedPages'

import classes from './SetupPagesViewer.module.scss'

interface SetupPagesViewerProps {
  isReference?: boolean
  accept?: string
  filesPages: ComparisonOutlineResponse[]
}

export const SetupPagesViewer: FC<SetupPagesViewerProps> = ({ accept, filesPages, isReference = false }) => {
  const pagesListRef = useRef<HTMLDivElement | null>(null)
  const areaType = isReference ? 'reference' : 'sample'
  const activePageId = useSelectedPages((state) => state.activePageIndex[areaType])
  const setActivePageIndex = useSelectedPages((state) => state.setActivePageIndex)
  const removePage = useSelectedPages((state) => state.removePage)
  const restorePage = useSelectedPages((state) => state.restorePage)
  const removedPages = useSelectedPages((state) => state.removedPages[areaType])
  console.log(removedPages)
  const onPageClick = (page: number, isRemovedPage: boolean) => {
    if (isRemovedPage) {
      return
    }
    setActivePageIndex(page, isReference)
  }

  const rowVirtualizer = useVirtualizer({
    count: filesPages.length,
    getScrollElement: () => pagesListRef.current,
    estimateSize: () => 200,
    overscan: 3,
  })
  return (
    <Box className={cx(classes.pages, { [classes.right]: !isReference })}>
      {filesPages.length > 0 && (
        <Box className={classes.wrapper} ref={pagesListRef}>
          <div className={classes.virtualItems} style={{ height: `${rowVirtualizer.getTotalSize()}px` }}>
            {rowVirtualizer.getVirtualItems().map((virtualItem) => {
              const { id, previewFullUrl, number } = filesPages[virtualItem.index]
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
                    onClick={() => onPageClick(id, isRemovedPage)}
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
                          removePage(id, isReference)
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

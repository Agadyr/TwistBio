import { FC } from 'react'

import { Box, Typography } from '@mui/material'
import cx from 'clsx'
import { useComparisonFilesPages } from 'modules/setup/queries/useComparisonFilesPages'

import { SetupExcludeCheckbox } from './SetupExcludeCheckbox'
import { SetupPagesViewer } from './SetupPagesViewer'
import { SetupPageViewer } from './SetupPageViewer'
import classes from './SetupSelectionArea.module.scss'

interface SetupSelectionAreaProps {
  comparisonId: number
  isReference?: boolean
}

export const SetupSelectionArea: FC<SetupSelectionAreaProps> = ({ isReference, comparisonId }) => {
  const { filesPages } = useComparisonFilesPages(comparisonId, isReference)
  const pages = filesPages?.items || []
  return (
    <Box width="100%">
      <Box className={classes.area}>
        <Typography className={cx(classes.areaName, { [classes.right]: isReference })}>
          {isReference ? 'Эталон' : 'Образец'}
        </Typography>
        <SetupPagesViewer filesPages={pages} isReference={isReference} />
        <SetupPageViewer filesPages={pages} isReference={isReference} />
      </Box>

      <Box alignItems="center" display="flex" justifyContent="space-between">
        <Typography className={!isReference ? classes.totalPages : ''}>Всего страниц {pages.length || 0}</Typography>
        <SetupExcludeCheckbox isReference={isReference} />
      </Box>
    </Box>
  )
}

import { FC } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import InsertLinkIcon from '@mui/icons-material/InsertLink'
import { Box, IconButton } from '@mui/material'
import { FilePreview } from 'components/common/FilePreview'
import { ComparisonPairResponse } from 'modules/comparison/api'

import classes from './SetupPagesPair.module.scss'

interface SetupPagesPairProps {
  pair: ComparisonPairResponse
  onRemove: VoidFunction
}

export const SetupPagesPair: FC<SetupPagesPairProps> = ({ pair: { samplePage, referencePage }, onRemove }) => (
  <Box className={classes.pair}>
    <FilePreview className={classes.img} fileUrl={samplePage.previewFullUrl} pageNum={samplePage.number} />
    <FilePreview className={classes.img} fileUrl={referencePage.previewFullUrl} pageNum={referencePage.number} />
    <span className={classes.pageNum}>{samplePage.number}</span>
    <span className={classes.pageNum}>{referencePage.number}</span>
    <InsertLinkIcon className={classes.link} color="inherit" />
    <IconButton className={classes.remove} onClick={onRemove}>
      <CloseIcon />
    </IconButton>
  </Box>
)

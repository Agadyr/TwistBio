import { FC } from 'react'

import { Box, Typography } from '@mui/material'

import classes from './ImageSection.module.scss'

export const ImageSection: FC<{ title: string; src?: string }> = ({ title, src }) => (
  <Box>
    <Typography>{title}</Typography>
    <Box className={classes.imgWrap}>{src && <img alt={title} className={classes.img} src={src} />}</Box>
  </Box>
)

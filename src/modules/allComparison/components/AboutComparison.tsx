import { useState } from 'react'

import { Box, Typography } from '@mui/material'
import { useNavigate, useParams } from '@tanstack/react-router'
import Header from 'components/common/headerMain/Header'
import { useGetComparisonReport } from 'modules/comparison/queries/useGetReportComparison'

import classes from './About.module.scss'
import { DetailComparison } from './detailsComparison/detailsComparison'
import { DetailsPairs } from './detailsComparison/detailsPairs/detailsPairs'

export default function AboutComparison() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const params = useParams({ from: '/$compId/about' })
  const { comparison } = useGetComparisonReport(Number(params.compId))
  if (!comparison) {
    return 'none'
  }
  const { comparisonType } = comparison.stage
  return (
    <>
      <Header />
      {!open && (
        <Box className="container">
          <DetailComparison comparisonReport={comparison} />

          {comparison?.pairs.map((item, index) => (
            <DetailsPairs comparisonType={comparisonType} id={index} item={item} key={index} />
          ))}

          <Typography className="h3" sx={{ textAlign: 'center' }} variant="h4">
            Комментарий пользователя
          </Typography>
          <Typography>Текст комментария</Typography>
        </Box>
      )}
    </>
  )
}

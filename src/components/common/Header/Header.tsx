import { Box, LinearProgress, Typography } from '@mui/material'
import { ComparisonStep, stepNumber } from 'components/common/Header/constants/comparisonStep'
import { getHeaderData } from 'components/common/Header/helpers/getHeaderData'
import { useHeaderStep } from 'components/common/Header/store'

export const Header = () => {
  const { header, step } = useHeaderStep()
  const { fullHeader, progress } = getHeaderData(header, step)

  return (
    <>
      <Typography mb={0.5} variant={step === ComparisonStep.Setup || ComparisonStep.Results ? 'h5' : 'h3'}>
        {fullHeader}
      </Typography>
      <Box>
        <LinearProgress color="success" sx={{ borderRadius: 1, height: 12 }} value={progress} variant="determinate" />
      </Box>
    </>
  )
}

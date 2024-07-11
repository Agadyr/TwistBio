import { Box, LinearProgress, Typography } from '@mui/material'
import { ComparisonStep, stepNumber } from 'components/common/Header/constants/comparisonStep'
import { getHeaderData } from 'components/common/Header/helpers/getHeaderData'
import { useHeaderStep } from 'components/common/Header/store'

export const Header = () => {
  const { header, step } = useHeaderStep()
  const { fullHeader, progress } = getHeaderData(header, step)

  const marginBottomValue = stepNumber[step] || 4
  return (
    <>
      <Typography
        marginBottom={marginBottomValue}
        //TODO:h5,h3,h4,h5 .. лучше занести в enum
        variant={step === ComparisonStep.Setup || ComparisonStep.Results ? 'h5' : 'h3'}
      >
        {fullHeader}
      </Typography>
      <Box marginY={2}>
        <LinearProgress color="success" sx={{ borderRadius: 1, height: 16 }} value={progress} variant="determinate" />
      </Box>
    </>
  )
}

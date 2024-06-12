import { ComparisonStep, maxSteps, stepNumber } from 'components/common/Header/constants/comparisonStep'

export const getHeaderData = (header: string, comparisonStep: ComparisonStep) => {
  const step = stepNumber[comparisonStep]
  return {
    fullHeader: `Шаг ${step}. ${header}`,
    progress: (100 / maxSteps) * step,
  }
}

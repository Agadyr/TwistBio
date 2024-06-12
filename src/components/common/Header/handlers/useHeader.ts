import { useEffect } from 'react'

import { useTitle } from 'ahooks'
import { commonHeaders, ComparisonStep } from 'components/common/Header/constants/comparisonStep'
import { useHeaderStep } from 'components/common/Header/store'

export const useHeader = (step: ComparisonStep, header?: string) => {
  header = header ?? commonHeaders[step]
  const setHeaderStep = useHeaderStep((state) => state.setHeaderStep)
  useTitle(header)
  useEffect(() => {
    setHeaderStep(header, step)
  }, [header, step])
}

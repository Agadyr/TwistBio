import { ComparisonStep } from 'components/common/Header/constants/comparisonStep'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface UseHeaderStep {
  header: string
  step: ComparisonStep
  setHeaderStep: (header: string, step: ComparisonStep) => void
}

export const useHeaderStep = create<UseHeaderStep>()(
  devtools(
    (set) => ({
      header: '',
      step: ComparisonStep.Type,
      setHeaderStep: (header, step) => {
        set({ header, step })
      },
    }),
    {
      store: 'comparisonHeader',
    },
  ),
)

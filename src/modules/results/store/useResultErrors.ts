import { devtools } from 'config/devtools'
import { create } from 'zustand'

export interface UseResultErrors {
  selectedPair: number | undefined
  selectedError: number
  hoveredError: number
  setSelectedPair: (pairIndex: number) => void
  setSelectedError: (errorNum: number) => void
  setHoveredError: (errorNum: number) => void
  clearErrorSelection: () => void
}

export const useResultErrors = create<UseResultErrors>()(
  devtools(
    (set) => ({
      selectedPair: undefined,
      selectedError: 0,
      hoveredError: 0,
      setSelectedPair: (pairIndex) => {
        set({ selectedPair: pairIndex, selectedError: 0 })
      },
      setSelectedError: (errorNum) => {
        set({ selectedError: errorNum })
      },
      setHoveredError: (errorNum) => {
        set({ hoveredError: errorNum })
      },
      clearErrorSelection: () => {
        set({ selectedError: 0 })
      },
    }),
    {
      store: 'ResultErrors',
    },
  ),
)

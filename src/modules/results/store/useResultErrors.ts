import { devtools } from 'config/devtools'
import { CropRatio } from 'interfaces/common.interfaces'
import { create } from 'zustand'

export interface UseResultErrors {
  selectedPair: number | undefined
  selectedError: number
  hoveredError: number
  selectedCropRatio: CropRatio
  idOfError: string
  setSelectedPair: (pairIndex: number) => void
  setSelectedError: (errorNum: number) => void
  setHoveredError: (errorNum: number) => void
  setCropRatio: (coordinates: CropRatio) => void
  setIdOfError: (index: string) => void
  clearErrorSelection: () => void
}

export const useResultErrors = create<UseResultErrors>()(
  devtools(
    (set) => ({
      selectedPair: undefined,
      selectedError: 0,
      hoveredError: 0,
      selectedCropRatio: [0, 0, 0, 0],
      idOfError: '',
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
      setCropRatio: (coordinates) => {
        set({ selectedCropRatio: coordinates })
      },
      setIdOfError: (index: string) => {
        set({ idOfError: index })
      },
    }),
    {
      store: 'ResultErrors',
    },
  ),
)

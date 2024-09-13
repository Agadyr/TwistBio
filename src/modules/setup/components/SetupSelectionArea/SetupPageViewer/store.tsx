import axios, { AxiosResponse } from 'axios'
import { transformCoordinates } from 'modules/setup/helpers/transformCoordinates'
import { create } from 'zustand'

interface PackageState {
  data: any
  dataSample: any
  isLoading: boolean
  isLoadingSample: boolean
  norm_box_coordinates: number[]
  fetchPage: (file: File, stage: any, isReference?: boolean) => Promise<void>
  setIsLoading: (isLoading: boolean, isReference?: boolean) => void
}

export const getPackage = create<PackageState>((set) => ({
  data: [0, 0, 0, 0],
  dataSample: [0, 0, 0, 0],
  isLoading: false,
  isLoadingSample: false,
  norm_box_coordinates: [0, 0, 0, 0],
  fetchPage: async (file: File, stage: any, isReference?: boolean) => {
    const form = new FormData()
    form.append('file', file)
    try {
      const res: AxiosResponse<PackageState> = await axios.post(
        `http://api.statanly.com:9135/get-package?stage=${stage}`,
        form,
      )
      const transformedData = transformCoordinates(res.data.norm_box_coordinates)
      if (isReference) {
        set({ data: transformedData })
        set({ isLoading: false })
      } else {
        set({ dataSample: transformedData })
        set({ isLoadingSample: false })
      }
    } catch (error) {
      set({ isLoading: false })
      set({ isLoadingSample: false })
      console.error('Error fetching comparisons:', error)
    }
  },
  setIsLoading: (isLoading: boolean, isReference?: boolean) => {
    if (isReference) {
      set({ isLoading })
    } else {
      set({ isLoadingSample: isLoading })
    }
  },
}))

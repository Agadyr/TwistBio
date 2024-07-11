import axios, { AxiosResponse } from 'axios'
import { transformCoordinates } from 'modules/setup/helpers/transformCoordinates'
import { create } from 'zustand'

interface PackageState {
  data: any
  dataSample: any
  isClickToContur: boolean
  norm_box_coordinates: number[]
  fetchPage: (file: File, stage: any, isReference?: boolean) => Promise<void>
  toChangetoTrue: () => void
}

export const getPackage = create<PackageState>((set) => ({
  data: [0, 0, 0, 0],
  dataSample: [0, 0, 0, 0],
  isClickToContur: false,
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
      } else {
        set({ dataSample: transformedData })
      }
    } catch (error) {
      console.error('Error fetching comparisons:', error)
    }
  },
  toChangetoTrue: () => {
    set({ isClickToContur: true })
  },
}))

import axios, { AxiosResponse } from 'axios'
import { create } from 'zustand'

interface PackageState {
  data: any
  dataSample: any
  isClickToContur: boolean
  fetchPage: (file: File, stage: any, isReference?: boolean) => Promise<void>
  toChangetoTrue: () => void
}

export const getPackage = create<PackageState>((set) => ({
  data: [0, 0, 0, 0],
  dataSample: [0, 0, 0, 0],
  isClickToContur: false,
  fetchPage: async (file: File, stage: any, isReference?: boolean) => {
    const form = new FormData()
    form.append('file', file)
    try {
      const res: AxiosResponse<PackageState> = await axios.post(
        `${import.meta.env.VITE_API_URL2}/get-package?stage=${stage}`,
        form,
      )
      console.log(isReference)
      if (isReference) {
        set({ data: res.data })
      } else {
        set({ dataSample: res.data })
      }
    } catch (error) {
      console.error('Error fetching comparisons:', error)
    }
  },
  toChangetoTrue: () => {
    set({ isClickToContur: true })
  },
}))

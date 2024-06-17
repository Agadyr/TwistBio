import axios, { AxiosResponse } from 'axios'
import { create } from 'zustand'

interface PackageState {
  data: any
  isClickToContur: boolean
  fetchPage: (file: File, stage: any) => Promise<void>
  toChangetoTrue: any
}

export const getPackage = create<PackageState>((set) => ({
  data: {},
  isClickToContur: false,
  fetchPage: async (file: File, stage: any) => {
    const form = new FormData()
    form.append('file', file)
    try {
      const res: AxiosResponse<PackageState[]> = await axios.post(
        `http://api.statanly.com:9135/get-package?stage=${stage}`,
        form,
      )
      console.log(res)
      set({ data: res.data })
    } catch (error) {
      console.error('Error fetching comparisons:', error)
    }
  },
  toChangetoTrue: () => {
    set({ isClickToContur: true })
  },
}))

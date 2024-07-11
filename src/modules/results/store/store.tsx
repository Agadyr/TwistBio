import axios, { AxiosResponse } from 'axios'
import camelcaseKeys from 'camelcase-keys'
import { create } from 'zustand'

interface ErrorStore {
  pairErrors: any
  fetchErrors: (comparisonId: any, pairId: any, data: any) => Promise<void>
}

export const usefilterPairErrors = create<ErrorStore>((set) => ({
  pairErrors: [],
  fetchErrors: async (comparisonId: any, pairId: any, data: any) => {
    try {
      const res: AxiosResponse<any> = await axios.get(
        `${import.meta.env.VITE_API_URL}/comparisons/${comparisonId}/pairs/${pairId}/errors`,
        {
          params: {
            typeId: data.type_id__in,
            severityId: data.severity_id__in,
          },
        },
      )
      const transformedData = camelcaseKeys(res.data, { deep: true })
      set({ pairErrors: transformedData })
    } catch (error) {
      console.error('Error fetching comparisons:', error)
    }
  },
}))

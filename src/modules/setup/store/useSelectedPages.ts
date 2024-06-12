import { devtools } from 'config/devtools'
import { CropRatio } from 'interfaces/common.interfaces'
import { create } from 'zustand'

export interface RemovedPages {
  reference: number[]
  sample: number[]
}

export interface ActivePageIndex {
  reference: number
  sample: number
}

export interface UseRemovedPages {
  removedPages: RemovedPages
  activePageIndex: ActivePageIndex
  samplePageFrames: Record<number, CropRatio>
  referencePageFrames: Record<number, CropRatio>
  removePage: (pageIndex: number, isReference: boolean) => void
  restorePage: (pageIndex: number, isReference: boolean) => void
  setActivePageIndex: (pageIndex: number, isReference: boolean) => void
  setSamplePageFrame: (pageIndex: number, cropRatio: CropRatio) => void
  setReferencePageFrame: (pageIndex: number, cropRatio: CropRatio) => void
}

export const useSelectedPages = create<UseRemovedPages>()(
  devtools(
    (set) => ({
      removedPages: {
        reference: [],
        sample: [],
      },
      activePageIndex: {
        reference: 0,
        sample: 0,
      },
      samplePageFrames: {},
      referencePageFrames: {},
      setActivePageIndex: (pageIndex, isReference) => {
        const key = isReference ? 'reference' : 'sample'
        set((prev) => ({ activePageIndex: { ...prev.activePageIndex, [key]: pageIndex } }))
      },
      removePage: (pageIndex, isReference) => {
        const key = isReference ? 'reference' : 'sample'
        set((prev) => ({ removedPages: { ...prev.removedPages, [key]: [...prev.removedPages[key], pageIndex] } }))
      },
      restorePage: (pageIndex, isReference) => {
        const key = isReference ? 'reference' : 'sample'
        set((prev) => ({
          removedPages: { ...prev.removedPages, [key]: prev.removedPages[key].filter((id) => id !== pageIndex) },
        }))
      },
      setSamplePageFrame: (pageIndex, cropRatio) => {
        set((prev) => ({ samplePageFrames: { ...prev.samplePageFrames, [pageIndex]: cropRatio } }))
      },
      setReferencePageFrame: (pageIndex, cropRatio) => {
        set((prev) => ({ referencePageFrames: { ...prev.referencePageFrames, [pageIndex]: cropRatio } }))
      },
    }),
    {
      store: 'SelectedPagesState',
    },
  ),
)

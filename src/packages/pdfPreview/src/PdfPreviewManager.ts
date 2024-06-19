import * as pdfjsLib from 'pdfjs-dist'
import { PDFDocumentProxy, RenderParameters } from 'pdfjs-dist/types/src/display/api'

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString()

class PdfPreviewManager {
  files: Record<string, PDFDocumentProxy>
  previews: Record<string, Record<number, string>>
  filePromises: Record<string, Promise<PDFDocumentProxy>>
  previewPromises: Record<string, Record<number, Promise<string>>>

  constructor() {
    this.files = {}
    this.filePromises = {}
    this.previews = {}
    this.previewPromises = {}
  }

  async getPreview(fileUrl: string, pageNum: number) {
    const pdf = await this.#getPdfPromise(fileUrl)

    const preview = await this.#getPdfPreviewPromise(pdf, fileUrl, pageNum)

    return preview
  }

  async getPdfPages(fileUrl: string) {
    const pdf = await this.#getPdfPromise(fileUrl)
    return pdf.numPages
  }

  async #getPdfPromise(fileUrl: string) {
    let filePromise = this.filePromises[fileUrl]
    let pdf: PDFDocumentProxy | null = null
    if (filePromise) {
      pdf = await filePromise
    } else {
      filePromise = this.#getPdfFile(fileUrl)
      this.filePromises[fileUrl] = filePromise
      pdf = await filePromise
    }
    return pdf
  }

  async #getPdfPreviewPromise(pdf: PDFDocumentProxy, fileUrl: string, pageNum: number) {
    const filePreviewPromises = this.previewPromises[fileUrl] ?? {}
    let previewPromise = filePreviewPromises[pageNum]
    let preview = ''
    if (previewPromise) {
      preview = await previewPromise
    } else {
      previewPromise = this.#getPdfPreview(pdf, fileUrl, pageNum)
      filePreviewPromises[pageNum] = previewPromise
      this.previewPromises[fileUrl] = filePreviewPromises
      preview = await previewPromise
    }
    return preview
  }

  async #getPdfFile(fileUrl: string) {
    let pdf = this.files[fileUrl]
    if (pdf) {
      return pdf
    }
    pdf = await pdfjsLib.getDocument(fileUrl).promise
    this.files[fileUrl] = pdf
    return pdf
  }

  async #getPdfPreview(pdf: PDFDocumentProxy, fileUrl: string, pageNum: number) {
    const filePages = this.previews[fileUrl] || {}
    const savedPreview = filePages?.[pageNum]
    if (savedPreview) {
      return savedPreview
    }
    const page = await pdf.getPage(pageNum)
    const viewport = page.getViewport({ scale: 4.0 })
    const canvas = document.createElement('canvas')

    canvas.width = viewport.width
    canvas.height = viewport.height
    const renderContext = {
      canvasContext: canvas.getContext('2d'),
      viewport,
    }

    await page.render(renderContext as RenderParameters).promise
    const preview = canvas.toDataURL()
    filePages[pageNum] = preview
    this.previews[fileUrl] = filePages
    return canvas.toDataURL()
  }
}

export const pdfPreviewManager = new PdfPreviewManager()

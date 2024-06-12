export const getFileName = (contentDisposition: string | undefined = ''): string =>
  contentDisposition
    .slice('attachment; filename='.length, contentDisposition.length)
    .trim()
    .replace(/^"(.*)"$/, '$1')

export const extractFileNameFromPath = (filePath: string): string => {
  const pathSegments = filePath.split('/')
  return pathSegments[pathSegments.length - 1]
}

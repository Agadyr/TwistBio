export const deleteLastPoint = (text?: string | null) => {
  if (!text) {
    return
  }
  if (text[text.length - 1] === '.') {
    return text.slice(0, text.length - 1)
  }
  return text
}

export const removeHTMLSelection = () => {
  if (window.getSelection) {
    if (window.getSelection()?.empty) {
      // Для Chrome
      window.getSelection()?.empty()
    } else if (window.getSelection()?.removeAllRanges) {
      // Для Firefox
      window.getSelection()?.removeAllRanges()
    }
  } else if ((document as any).selection) {
    // Для IE
    ;(document as any).selection.empty()
  }
}

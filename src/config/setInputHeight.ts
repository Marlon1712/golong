const setInputHeight = (element, defaultHeight: string) => {
  if (element) {
    // Support passing an event and a raw element via React ref
    const target = element.target ? element.target : element
    target.style.height = defaultHeight
    target.style.height = `${target.scrollHeight}px`
  }
}
export default setInputHeight

export default (error: Error | string): void => {
  if (error) {
    setTimeout(() => {
      throw error
    })
  }
}

const throwAsync = (error: Error | string): void => {
  if (error) {
    setTimeout(() => {
      throw error
    })
  }
}

export default throwAsync

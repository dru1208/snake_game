const setDeltaTime = (callback, intervalTime) => {
  const interval = setInterval(callback, intervalTime)
  return interval
}

export { setDeltaTime }
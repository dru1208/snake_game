const setDeltaTime = (callback, intervalTime) => {
  const interval = setInterval(callback, intervalTime)
  return interval
}

const executeWithFramerate = (framerate, callback) => {
  const intervalTime = 1000 / framerate
  const interval = setInterval(callback, intervalTime)
  return () => clearInterval(interval)
}

const executeWithWindowAnimationFrame = (callback) => {
  const request = () => {
    callback()
    executeWithWindowAnimationFrame(callback)
  }

  window.requestAnimationFrame(request)

  return () => window.cancelAnimationFrame(request)
}


export { setDeltaTime, executeWithFramerate, executeWithWindowAnimationFrame }
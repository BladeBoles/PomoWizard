const runningIntervals = {}

self.onmessage = function (e) {
  console.log('🚀 ~ file: timer-worker.js:4 ~ e:', e)
  switch (e.data.command) {
    case 'interval:start': {
      const newInterval = setInterval(function () {
        postMessage({
          message: 'interval:tick',
          id: e.data.id
        })
      }, e.data.interval)

      postMessage({
        message: 'interval:started',
        id: e.data.id
      })

      runningIntervals[e.data.id] = newInterval
      break
    }

    case 'interval:clear':
      clearInterval(runningIntervals[e.data.id])

      postMessage({ message: 'interval:cleared', id: e.data.id })

      delete runningIntervals[e.data.id]
      break
  }
}

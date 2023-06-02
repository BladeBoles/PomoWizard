const intervalState = {}

self.onmessage = function (e) {
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

      intervalState[e.data.id] = newInterval
      break
    }

    case 'interval:clear':
      clearInterval(intervalState[e.data.id])

      postMessage({ message: 'interval:cleared', id: e.data.id })

      delete intervalState[e.data.id]
      break
  }
}

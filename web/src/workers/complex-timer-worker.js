const runningIntervals = {}

onmessage = function (e) {
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

// interface TimerObject {
//   nextId: number
//   callbacks: {
//     [key: number]: { fn: any; context: any }
//   }
//   setInterval: (cb: any, interval: any, context?: any) => {}
//   onMessage: (e: any) => void
//   clearInterval: (e: any) => void
// }

// const timerObject: TimerObject = {
//   nextId: 0,
//   callbacks: {},

//   setInterval: function (cb, interval, context) {
//     console.log(
//       '🚀 ~ file: GenericTimer.vue:76 ~ timerObject: TimerObject.cb, interval,:',
//       cb,
//       interval
//     )
//     this.nextId++
//     const currentId = this.nextId
//     this.callbacks[currentId] = { fn: cb, context }

//     timerWorker.postMessage({
//       command: 'interval:start',
//       interval,
//       id: currentId
//     })

//     // TODO: why do we need to return this?
//     return currentId
//   },

//   onMessage: function (e) {
//     console.log(
//       '🚀 ~ file: GenericTimer.vue:81 ~ timerObject: TimerObject.e:',
//       e
//     )
//     switch (e.data.message) {
//       case 'interval:tick': {
//         let callback = this.callbacks[e.data.id]
//         // TODO: BB wtf does this mean?
//         if (callback && callback.fn) {
//           callback.fn.apply(callback.context)
//         }
//         break
//       }
//     }
//   },
//   clearInterval: function (id) {
//     timerWorker.postMessage({
//       command: 'interval:clear',
//       id
//     })
//   }
// }

// Lets the handler function utilize the scope "this" has inside the object???
// timerWorker.onmessage = timerObject.onMessage.bind(timerObject)

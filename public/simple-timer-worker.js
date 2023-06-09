onmessage = function () {
  this.setTimeout(function () {
    postMessage({
      message: 'interval-complete'
    })
  }, 1000)
}

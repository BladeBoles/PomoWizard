<script setup lang="ts">
import { ref, computed } from 'vue'
const stopwatchRunning = ref(false)
const currentStopwatchCount = ref(0)

const emit = defineEmits(['finished', 'started', 'stopped'])

const stopwatchWorker = new Worker('src/simple-timer-worker.js')

const startWatch = () => {
  stopwatchRunning.value = true
  stopwatchWorker.postMessage({ message: 'start timer!!!' })
  if (currentStopwatchCount.value === 0) emit('started')
}

stopwatchWorker.onmessage = function () {
  currentStopwatchCount.value++
  if (stopwatchRunning.value) {
    startWatch()
  }
}

const pauseWatch = () => {
  stopwatchRunning.value = false
}

const finishWatch = () => {
  stopwatchRunning.value = false
  emit('finished', { focusSeconds: currentStopwatchCount.value })
  currentStopwatchCount.value = 0
}

const displayMinutes = computed(() => {
  const minutes = Math.floor(currentStopwatchCount.value / 60)
  const minutesFormatted =
    minutes.toString().length < 2
      ? `0${minutes.toString()}`
      : minutes.toString()
  return minutesFormatted
})
const displaySeconds = computed(() => {
  const seconds = currentStopwatchCount.value % 60
  const secondsFormatted =
    seconds.toString().length < 2
      ? `0${seconds.toString()}`
      : seconds.toString()
  return secondsFormatted
})
</script>

<template>
  <main>
    <div>
      <h2>Stopwatch</h2>
      {{ displayMinutes }} : {{ displaySeconds }}
      <button @click="startWatch">Start Watch</button>
      <button @click="pauseWatch">Pause Watch</button>
      <button :disabled="currentStopwatchCount < 3" @click="finishWatch">
        Finish Session
      </button>
    </div>
  </main>
</template>

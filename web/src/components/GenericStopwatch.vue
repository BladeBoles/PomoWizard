<script setup lang="ts">
import { ref, computed } from 'vue'
const stopwatchRunning = ref(false)
const currentStopwatchCount = ref(0)

const emit = defineEmits(['finished', 'started', 'stopped'])

const stopwatchWorker = new Worker('/simple-timer-worker.js')

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
    <div class="generic-stopwatch__body">
      <span class="generic-stopwatch__display"
        >{{ displayMinutes }} : {{ displaySeconds }}</span
      >
      <div class="generic-stopwatch__buttons">
        <button
          aria-label="play"
          class="generic-stopwatch__play-button"
          @click="startWatch"
        >
          <i class="fa-solid fa-play" />
        </button>
        <button
          aria-label="pause"
          class="generic-stopwatch__pause-button"
          @click="pauseWatch"
        >
          <i class="fa-solid fa-pause" />
        </button>
        <button
          aria-label="finish"
          class="generic-stopwatch__finish-button"
          :disabled="currentStopwatchCount < 3"
          @click="finishWatch"
        >
          <i class="fa-solid fa-forward" />
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped>
.generic-stopwatch__display {
  font-size: 80px;
  margin-top: -10px;
}

.generic-stopwatch__buttons {
  margin-bottom: 20px;
  margin-top: 15px;
}
.generic-stopwatch__buttons button {
  height: 48px;
  width: 48px;
  margin-right: 15px;
  cursor: pointer;
  border-radius: 6px;
}

.generic-stopwatch__play-button {
  color: white;
  background-color: green;
}
.generic-stopwatch__pause-button {
  color: white;
  background-color: goldenrod;
}
.generic-stopwatch__finish-button {
  color: white;
  background-color: lightskyblue;
}
.generic-stopwatch__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 600px) {
  .generic-stopwatch__display {
    font-size: 120px;
  }
}
</style>

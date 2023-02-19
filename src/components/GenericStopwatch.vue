<script setup lang="ts">
import { ref, computed, watch } from 'vue'
const stopwatchRunning = ref(false)
const currentStopwatchCount = ref(0)

const emit = defineEmits(['finished', 'started', 'stopped'])

const startWatch = () => {
  stopwatchRunning.value = true
  emit('started')
}

const pauseWatch = () => {
  stopwatchRunning.value = false
}

const finishWatch = () => {
  stopwatchRunning.value = false
  emit('finished', { focusSeconds: currentStopwatchCount.value })
  currentStopwatchCount.value = 0
}

watch(stopwatchRunning, (newValue) => {
  if (newValue) {
    setTimeout(() => {
      currentStopwatchCount.value++
    }, 1000)
  }
})
watch(currentStopwatchCount, () => {
  if (stopwatchRunning.value) {
    setTimeout(() => {
      currentStopwatchCount.value++
    }, 1000)
  }
})

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

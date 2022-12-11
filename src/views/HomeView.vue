<script setup lang="ts">
import { ref, computed, watch } from 'vue'
const timerEnabled = ref(false)
const timerLengthInMinutes = ref(25)
const remainingTimeInSeconds = ref(1500)

const startTimer = () => {
  timerEnabled.value = true
}

const pauseTimer = () => {
  timerEnabled.value = false
}

const stopTimer = () => {
  timerEnabled.value = false
  remainingTimeInSeconds.value = timerLengthInMinutes.value * 60
}

watch(timerEnabled, (newValue) => {
  if (remainingTimeInSeconds.value > 0 && newValue === true) {
    setTimeout(() => {
      remainingTimeInSeconds.value--
    }, 1000)
  }
})
watch(remainingTimeInSeconds, (newValue) => {
  if (newValue > 0 && timerEnabled.value === true) {
    setTimeout(() => {
      remainingTimeInSeconds.value--
    }, 1000)
  }
})
watch(timerLengthInMinutes, () => {
  if (timerEnabled.value === false) {
    remainingTimeInSeconds.value = timerLengthInMinutes.value * 60
  }
})
const displayMinutes = computed(() => {
  const minutes = Math.floor(remainingTimeInSeconds.value / 60)
  const minutesFormatted =
    minutes.toString().length < 2
      ? `0${minutes.toString()}`
      : minutes.toString()
  return minutesFormatted
})
const displaySeconds = computed(() => {
  const seconds = remainingTimeInSeconds.value % 60
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
      <h1>Pomodoro Timer</h1>
      {{ displayMinutes }} : {{ displaySeconds }}
      <button @click="startTimer">Start Timer</button>
      <button @click="pauseTimer">Pause Timer</button>
      <button @click="stopTimer">Stop Timer</button>

      <input
        :disabled="timerEnabled"
        id="timer-length"
        type="number"
        v-model="timerLengthInMinutes"
      />
      <label for="timer-length">Timer minutes</label>
    </div>
  </main>
</template>

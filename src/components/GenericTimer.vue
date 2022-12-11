<script setup lang="ts">
import { ref, computed, watch, onBeforeMount } from 'vue'
const timerEnabled = ref(false)
const timerMinutes = ref(25)
const remainingTimerSeconds = ref(1500)

const props = defineProps({
  defaultTimerMinutes: {
    type: Number,
    default: 25
  },
  timerType: {
    type: String,
    default: 'Pomodoro'
  },
  autoStartTimer: { type: Boolean, default: false }
})

const startTimer = () => {
  timerEnabled.value = true
}

const pauseTimer = () => {
  timerEnabled.value = false
}

const stopTimer = () => {
  timerEnabled.value = false
  remainingTimerSeconds.value = timerMinutes.value * 60
}

watch(timerEnabled, (newValue) => {
  if (remainingTimerSeconds.value > 0 && newValue === true) {
    setTimeout(() => {
      remainingTimerSeconds.value--
    }, 1000)
  }
})
watch(remainingTimerSeconds, (newValue) => {
  if (newValue > 0 && timerEnabled.value === true) {
    setTimeout(() => {
      remainingTimerSeconds.value--
    }, 1000)
  }
})
watch(timerMinutes, () => {
  if (timerEnabled.value === false) {
    remainingTimerSeconds.value = timerMinutes.value * 60
  }
})
watch(props, () => {
  timerMinutes.value = props.defaultTimerMinutes
  timerEnabled.value = props.autoStartTimer
})
const displayMinutes = computed(() => {
  const minutes = Math.floor(remainingTimerSeconds.value / 60)
  const minutesFormatted =
    minutes.toString().length < 2
      ? `0${minutes.toString()}`
      : minutes.toString()
  return minutesFormatted
})
const displaySeconds = computed(() => {
  const seconds = remainingTimerSeconds.value % 60
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
      <h2>{{ timerType }} Timer</h2>
      {{ displayMinutes }} : {{ displaySeconds }}
      <button @click="startTimer">Start Timer</button>
      <button @click="pauseTimer">Pause Timer</button>
      <button @click="stopTimer">Stop Timer</button>

      <input
        :disabled="timerEnabled"
        id="timer-length"
        type="number"
        v-model="timerMinutes"
      />
      <label for="timer-length">Timer minutes</label>
    </div>
  </main>
</template>

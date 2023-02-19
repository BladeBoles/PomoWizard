<script setup lang="ts">
import { ref, computed, watch } from 'vue'
const timerEnabled = ref(false)
const remainingTimerSeconds = ref(1500)
const timeoutID = ref()

const props = defineProps({
  timerMinutes: {
    type: Number,
    default: 25
  },
  timerType: {
    type: String,
    default: 'Pomodoro',
    validator(value: string) {
      return ['Pomodoro', 'Short Break', 'Long Break'].includes(value)
    }
  },
  autoStartTimer: { type: Boolean, default: false }
})

const emit = defineEmits(['finished', 'started', 'stopped'])

const startTimer = () => {
  timerEnabled.value = true
  emit('started')
}

const pauseTimer = () => {
  timerEnabled.value = false

  const pausedAudio = new Audio(
    'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3'
  )
  pausedAudio.play()
}

const stopTimer = () => {
  timerEnabled.value = false
  remainingTimerSeconds.value = props.timerMinutes * 60
  emit('stopped')
}
const finishTimer = () => {
  timerEnabled.value = false
  const focusSeconds = props.timerMinutes * 60 - remainingTimerSeconds.value
  remainingTimerSeconds.value = props.timerMinutes * 60
  emit('finished', {
    focusSeconds
  })
}

watch(timerEnabled, (newValue, oldValue) => {
  if (remainingTimerSeconds.value > 0 && newValue && newValue !== oldValue) {
    timeoutID.value = setTimeout(() => {
      remainingTimerSeconds.value--
    }, 1000)
  }
})
watch(remainingTimerSeconds, (newValue) => {
  if (newValue > 0 && timerEnabled.value === true) {
    timeoutID.value = setTimeout(() => {
      remainingTimerSeconds.value--
    }, 1000)
  }
  if (newValue === 0 && timerEnabled.value === true) {
    timerEnabled.value = false
    emit('finished')
  }
})

watch(
  () => props.timerType,
  () => {
    clearTimeout(timeoutID.value)
    remainingTimerSeconds.value = props.timerMinutes * 60
    timerEnabled.value = props.autoStartTimer
  }
)
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
      <button @click="finishTimer">Finish Timer Early</button>
    </div>
  </main>
</template>

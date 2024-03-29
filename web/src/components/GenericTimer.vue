<script setup lang="ts">
import { ref, computed, watch } from 'vue'

const timerEnabled = ref(false)
const remainingTimerSeconds = ref(1500)

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
  autoStartTimer: { type: Boolean, default: false },
  playTimerSounds: { type: Boolean, required: true }
})

const emit = defineEmits(['finished', 'started', 'stopped'])

const timerWorker = new Worker('/simple-timer-worker.js')

const startTimer = async () => {
  if (remainingTimerSeconds.value > 0) {
    timerEnabled.value = true

    timerWorker.postMessage({ message: 'start timer!!!' })
  }
  if (remainingTimerSeconds.value === props.timerMinutes * 60) emit('started')
}
timerWorker.onmessage = function () {
  remainingTimerSeconds.value--
  if (remainingTimerSeconds.value > 0 && timerEnabled.value) {
    startTimer()
  } else if (remainingTimerSeconds.value <= 0 && timerEnabled.value === true) {
    timerEnabled.value = false
    const focusSeconds = props.timerMinutes * 60 - remainingTimerSeconds.value
    emit('finished', { focusSeconds })
  }
}

const pauseTimer = () => {
  timerEnabled.value = false

  if (props.playTimerSounds) {
    const pausedAudio = new Audio(
      'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/arrow.mp3'
    )
    pausedAudio.play()
  }
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
  emit('finished', { focusSeconds })
}

watch(
  () => props.timerType,
  () => {
    remainingTimerSeconds.value = props.timerMinutes * 60
    timerEnabled.value = props.autoStartTimer
  }
)
watch(
  () => props.timerMinutes,
  () => {
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
    <div class="generic-timer__body">
      <span class="generic-timer__display"
        >{{ displayMinutes }} : {{ displaySeconds }}
      </span>
      <div class="generic-timer__buttons">
        <button
          aria-label="play"
          @click="startTimer"
          class="generic-timer__play-button"
        >
          <i class="fa-solid fa-play" />
        </button>
        <button
          aria-label="pause"
          class="generic-timer__pause-button"
          @click="pauseTimer"
        >
          <i class="fa-solid fa-pause" />
        </button>
        <button
          aria-label="stop"
          @click="stopTimer"
          class="generic-timer__stop-button"
        >
          <i class="fa-solid fa-stop" />
        </button>
        <button
          aria-label="finish"
          @click="finishTimer"
          class="generic-timer__finish-button"
        >
          <i class="fa-solid fa-forward" />
        </button>
      </div>
    </div>
  </main>
</template>
<style scoped>
.generic-timer__display {
  font-size: 80px;
  margin-top: -10px;
}
.generic-timer__buttons {
  margin-bottom: 20px;
  margin-top: 15px;
}
.generic-timer__buttons button {
  height: 48px;
  width: 48px;
  margin-right: 15px;
  cursor: pointer;
  border-radius: 6px;
}
.generic-timer__play-button {
  color: white;
  background-color: green;
}
.generic-timer__pause-button {
  color: white;
  background-color: goldenrod;
}
.generic-timer__stop-button {
  color: white;
  background-color: brown;
}
.generic-timer__finish-button {
  color: white;
  background-color: lightskyblue;
}
.generic-timer__body {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 600px) {
  .generic-timer__display {
    font-size: 120px;
  }
}
</style>

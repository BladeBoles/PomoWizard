<script setup lang="ts">
import GenericTimer from '@/components/GenericTimer.vue'
import GenericStopwatch from '@/components/GenericStopwatch.vue'
import SettingsModal from '@/modals/SettingsModal.vue'
import { ref, computed } from 'vue'

const timerType = ref('Pomodoro')
const finishedPomos = ref(0)
const pomosSinceLastLongBreak = ref(0)

const totalFocusMinutes = ref(0)
const totalFocusSessions = ref(0)

const pomodoroTimerMinutes = ref(25)
const shortBreakTimerMinutes = ref(5)
const longBreakTimerMinutes = ref(15)
const timerRunning = ref(false)
const autoStartTimer = ref(false)
const playTimerSounds = ref(false)

const showSettings = ref(false)

const timerMinutes = computed(() => {
  let minutes = 0
  switch (timerType.value) {
    case 'Short Break':
      minutes = shortBreakTimerMinutes.value
      break
    case 'Long Break':
      minutes = longBreakTimerMinutes.value
      break
    case 'Pomodoro':
    default:
      minutes = pomodoroTimerMinutes.value
  }
  return minutes
})

const handleTimerFinished = (e: any) => {
  totalFocusMinutes.value += e.focusSeconds / 60

  if (timerType.value === 'Short Break' || timerType.value === 'Long Break') {
    timerType.value = 'Pomodoro'
  } else {
    pomosSinceLastLongBreak.value++
    finishedPomos.value++

    if (pomosSinceLastLongBreak.value > 3) {
      timerType.value = 'Long Break'
      pomosSinceLastLongBreak.value = 0
    } else {
      timerType.value = 'Short Break'
    }
  }
  if (!autoStartTimer.value) timerRunning.value = false

  if (playTimerSounds.value) {
    // TODO: replace these with something a little less weird
    const successAudio = new Audio(
      'https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a'
    )
    successAudio.play()
  }
}

const handleStopWatchFinished = (e: any) => {
  totalFocusMinutes.value += e.focusSeconds / 60
  totalFocusSessions.value++
  if (playTimerSounds.value) {
    const successAudio = new Audio(
      'https://commondatastorage.googleapis.com/codeskulptor-assets/week7-brrring.m4a'
    )
    successAudio.play()
  }
}

const handleTimerStopped = () => {
  timerRunning.value = false
  if (playTimerSounds.value) {
    const stoppedAudio = new Audio(
      'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3'
    )
    stoppedAudio.play()
  }
}

const handleTimerStarted = () => {
  timerRunning.value = true
  if (playTimerSounds.value) {
    const startedAudio = new Audio(
      'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3'
    )
    startedAudio.play()
  }
}

const updateSettings = (newSettings: any) => {
  pomodoroTimerMinutes.value = newSettings.pomodoroTimerMinutes
  shortBreakTimerMinutes.value = newSettings.shortBreakTimerMinutes
  longBreakTimerMinutes.value = newSettings.longBreakTimerMinutes
  playTimerSounds.value = newSettings.playTimerSounds
  autoStartTimer.value = newSettings.autoStartTimer
  showSettings.value = false
}
</script>

<template>
  <h1>PomoWizard</h1>
  <p>Finished pomodoros: {{ finishedPomos }}</p>
  <p>Pomos since last long break: {{ pomosSinceLastLongBreak }}</p>
  <p>
    Total focus sessions (Stopwatch):
    {{ totalFocusSessions }}
  </p>
  <p>
    Total focus minutes (Pomos and Stopwatch):
    {{ totalFocusMinutes.toFixed(2) }}
  </p>
  <SettingsModal
    :timer-running="timerRunning"
    :play-timer-sounds="playTimerSounds"
    :auto-start-timer="autoStartTimer"
    :short-break-timer-minutes="shortBreakTimerMinutes"
    :long-break-timer-minutes="longBreakTimerMinutes"
    :pomodoro-timer-minutes="pomodoroTimerMinutes"
    @update="(settings) => updateSettings(settings)"
    v-if="showSettings"
  />
  <button v-else @click="() => (showSettings = true)">Settings</button>
  <fieldset>
    <legend>Timer Type</legend>
    <input
      type="radio"
      id="timer1"
      name="timer-type"
      value="Pomodoro"
      v-model="timerType"
    />
    <label for="timer1">Pomodoro</label>
    <input
      type="radio"
      id="timer2"
      name="timer-type"
      value="Short Break"
      v-model="timerType"
    />
    <label for="timer2">Short Break</label>
    <input
      type="radio"
      id="timer3"
      name="timer-type"
      value="Long Break"
      v-model="timerType"
    />
    <label for="timer3">Long Break</label>
  </fieldset>
  <GenericTimer
    :timer-minutes="timerMinutes"
    :timer-type="timerType"
    :auto-start-timer="autoStartTimer"
    :play-timer-sounds="playTimerSounds"
    @finished="handleTimerFinished"
    @stopped="handleTimerStopped"
    @started="handleTimerStarted"
  />
  <GenericStopwatch @finished="handleStopWatchFinished" />
</template>
<style scoped></style>

<script setup lang="ts">
import GenericTimer from '@/components/GenericTimer.vue'
import { ref, computed } from 'vue'

const timerRunning = ref(false)
const autoStartTimer = ref(false)
const timerType = ref('Pomodoro')
const finishedPomos = ref(0)
const pomosSinceLastLongBreak = ref(0)
const pomodoroTimerMinutes = ref(25)
const shortBreakTimerMinutes = ref(5)
const longBreakTimerMinutes = ref(15)

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

const handleTimerFinished = () => {
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
}
</script>

<template>
  <h1>PomoWizard</h1>
  <p>Finished pomodoros: {{ finishedPomos }}</p>
  <p>Pomos since last long break: {{ pomosSinceLastLongBreak }}</p>
  <fieldset>
    <legend>Timer Settings</legend>
    <ul class="home__timer-settings">
      <li>
        <label for="pomo-timer-length">Pomodoro Length</label>
        <input
          class="home__timer-length-input"
          :disabled="timerRunning"
          id="pomo-timer-length"
          type="number"
          v-model="pomodoroTimerMinutes"
        />
        <span>minutes</span>
      </li>
      <li>
        <label for="short-timer-length">Short Break Length</label>
        <input
          class="home__timer-length-input"
          :disabled="timerRunning"
          id="short-timer-length"
          type="number"
          v-model="shortBreakTimerMinutes"
        />
        <span>minutes</span>
      </li>
      <li>
        <label for="long-timer-length">Long Break Length</label>
        <input
          class="home__timer-length-input"
          :disabled="timerRunning"
          id="long-timer-length"
          type="number"
          v-model="longBreakTimerMinutes"
        />
        <span>minutes</span>
      </li>
      <li>
        <input
          type="checkbox"
          v-model="autoStartTimer"
          name="auto-start"
          id="auto-start"
        />
        <label for="auto-start"
          >Automatically start timer when switching types</label
        >
      </li>
    </ul>
  </fieldset>
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
    @finished="handleTimerFinished"
    @stopped="timerRunning = false"
    @started="timerRunning = true"
  />
</template>
<style scoped>
.home__timer-settings {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.home__timer-length-input {
  width: 100px;
}
</style>

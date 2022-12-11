<script setup lang="ts">
import GenericTimer from '@/components/GenericTimer.vue'
import { ref, computed } from 'vue'

const timerType = ref('Pomodoro')
const finishedPomos = ref(0)
const defaultTimerMinutes = computed(() => {
  let minutes = 0
  switch (timerType.value) {
    case 'Short Break':
      minutes = 5
      break
    case 'Long Break':
      minutes = 15
      break
    case 'Pomodoro':
    default:
      minutes = 25
  }
  return minutes
})
</script>

<template>
  <h1>PomoWizard</h1>
  <p>Finished pomodoros: {{ finishedPomos }}</p>
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
    :default-timer-minutes="defaultTimerMinutes"
    :timer-type="timerType"
    @finished="finishedPomos++"
  />
</template>

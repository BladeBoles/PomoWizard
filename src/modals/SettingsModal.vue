<script setup lang="ts">
import { reactive, onMounted } from 'vue'

const emit = defineEmits(['update'])
const props = defineProps({
  timerRunning: {
    type: Boolean,
    required: true
  },
  autoStartTimer: {
    type: Boolean,
    required: true
  },
  playTimerSounds: {
    type: Boolean,
    required: true
  },
  pomodoroTimerMinutes: {
    type: Number,
    required: true
  },
  shortBreakTimerMinutes: {
    type: Number,
    required: true
  },
  longBreakTimerMinutes: {
    type: Number,
    required: true
  }
})

const localSettings = reactive({
  autoStartTimer: false,
  playTimerSounds: false,
  pomodoroTimerMinutes: 0,
  shortBreakTimerMinutes: 0,
  longBreakTimerMinutes: 0
})

onMounted(() => {
  // TODO: This can probably be simplified with a helper method like toRefs or something similar
  localSettings.autoStartTimer = props.autoStartTimer
  localSettings.playTimerSounds = props.playTimerSounds
  localSettings.pomodoroTimerMinutes = props.pomodoroTimerMinutes
  localSettings.shortBreakTimerMinutes = props.shortBreakTimerMinutes
  localSettings.longBreakTimerMinutes = props.longBreakTimerMinutes
})

const saveChanges = () => {
  emit('update', localSettings)
}
</script>
<template>
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
          v-model="localSettings.pomodoroTimerMinutes"
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
          v-model="localSettings.shortBreakTimerMinutes"
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
          v-model="localSettings.longBreakTimerMinutes"
        />
        <span>minutes</span>
      </li>
      <li>
        <input
          type="checkbox"
          v-model="localSettings.autoStartTimer"
          name="auto-start"
          id="auto-start"
        />
        <label for="auto-start"
          >Automatically start timer when switching types</label
        >
      </li>
      <li>
        <h4>Timer sounds:</h4>
        <div>
          <input
            id="on"
            :value="true"
            type="radio"
            v-model="localSettings.playTimerSounds"
          />
          <label for="on">On</label>
        </div>
        <div>
          <input
            id="off"
            :value="false"
            type="radio"
            v-model="localSettings.playTimerSounds"
          />
          <label for="off">Off</label>
        </div>
      </li>
    </ul>
  </fieldset>
  <button @click="saveChanges">Submit</button>
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

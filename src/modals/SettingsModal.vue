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
  <div class="settings-modal-overlay">
    <div class="settings-modal-main">
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
    </div>
  </div>
</template>
<style scoped>
.settings-modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #000000da;
}

.settings-modal-main {
  text-align: center;
  background-color: white;
  max-height: 500px;
  max-width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
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

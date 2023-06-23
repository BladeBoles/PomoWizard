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
  <div class="settings-modal__overlay">
    <div class="settings-modal__main">
      <fieldset>
        <legend class="settings-modal__legend">Time (minutes)</legend>
        <ul class="settings-modal__timer-settings">
          <li class="settings-modal__timer-setting-item">
            <label for="pomo-timer-length">Pomodoro</label>
            <input
              class="settings-modal__timer-length-input"
              :disabled="timerRunning"
              id="pomo-timer-length"
              type="number"
              v-model="localSettings.pomodoroTimerMinutes"
            />
          </li>
          <li class="settings-modal__timer-setting-item">
            <label for="short-timer-length">Short Break</label>
            <input
              class="settings-modal__timer-length-input"
              :disabled="timerRunning"
              id="short-timer-length"
              type="number"
              v-model="localSettings.shortBreakTimerMinutes"
            />
          </li>
          <li class="settings-modal__timer-setting-item">
            <label for="long-timer-length">Long Break</label>
            <input
              class="settings-modal__timer-length-input"
              :disabled="timerRunning"
              id="long-timer-length"
              type="number"
              v-model="localSettings.longBreakTimerMinutes"
            />
          </li>
        </ul>
      </fieldset>
      <fieldset>
        <legend class="settings-modal__legend">Other Settings</legend>
        <ul class="settings-modal__other-settings">
          <li>
            <input
              type="checkbox"
              v-model="localSettings.autoStartTimer"
              name="auto-start"
              id="auto-start"
            />
            <label for="auto-start">Automatically start timers</label>
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
      <button class="settings-modal__submit-button" @click="saveChanges">
        Save
      </button>
    </div>
  </div>
</template>
<style scoped>
.settings-modal__overlay {
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

.settings-modal__main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: white;
  max-width: 350px;
  padding: 40px 10px 10px 10px;
  border-radius: 20px;
  font-size: 18px;
  color: rgb(85, 85, 85);
}
.settings-modal__timer-settings {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  width: 300px;
  justify-content: space-between;
}

.settings-modal__timer-setting-item {
  display: flex;
  flex-direction: column;
  margin-left: 5px;
}

.settings-modal__timer-setting-item label {
  text-align: left;
}

.settings-modal__other-settings {
  display: flex;
  flex-direction: column;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.settings-modal__timer-length-input {
  width: 60px;
  font-size: 20px;
  color: rgb(85, 85, 85);
}
.settings-modal__legend {
  font-size: 20px;
  font-weight: bold;
}

fieldset {
  border: none;
  margin-bottom: 20px;
  text-align: left;
  align-self: flex-start;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  opacity: 1;
}

.settings-modal__submit-button {
  background-color: #656874;
  color: white;
  padding: 6px;
  align-self: center;
  font-size: 18px;
  border-radius: 6px;
  align-self: flex-end;
}

h4 {
  margin: 10px 0 5px 0;
  padding-left: 2px;
}
</style>

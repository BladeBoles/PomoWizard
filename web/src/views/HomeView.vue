<script setup lang="ts">
import GenericTimer from '@/components/GenericTimer.vue'
import GenericStopwatch from '@/components/GenericStopwatch.vue'
import SettingsModal from '@/modals/SettingsModal.vue'
import { ref, computed, onMounted, warn } from 'vue'
import { useUserStore } from '@/stores/user'
import AuthServices from '@/services/AuthServices'
import { RouterLink } from 'vue-router'

const store = useUserStore()

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
const playTimerSounds = ref(true)

const showSettings = ref(false)
const userProfile = ref({})
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

onMounted(async () => {
  if (store.getUser.token) {
    const userProfileResponse = await AuthServices.getUserProfile(
      store.getUser.token
    )
    userProfile.value = userProfileResponse.data
    finishedPomos.value = userProfileResponse.data.totalPomodoros
  }
})

const updateUser = () => {
  if (store.getUser.email && store.getUser.token) {
    const updatedUser = AuthServices.updateUserProfile(
      store.getUser.token,
      store.getUser.email,
      {
        totalPomodoros: store.getUser.totalPomodoros
          ? store.getUser.totalPomodoros + 1
          : finishedPomos.value,
        totalFocusMinutes:
          store.getUser?.totalFocusMinutes ?? totalFocusMinutes.value
      }
    )
    userProfile.value = updatedUser
  }
}
const handleTimerFinished = (e: any) => {
  totalFocusMinutes.value += e.focusSeconds / 60

  if (timerType.value === 'Short Break' || timerType.value === 'Long Break') {
    timerType.value = 'Pomodoro'
  } else {
    pomosSinceLastLongBreak.value++
    finishedPomos.value++
    updateUser()

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
  updateUser()
}

const handleTimerStopped = () => {
  timerRunning.value = false
  if (playTimerSounds.value) {
    const stoppedAudio = new Audio(
      'https://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3'
    )
    stoppedAudio.play()
  }
  updateUser()
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
  <div class="home-view">
    <div class="home-view__header">
      <h1>PomoWizard</h1>
      <div>
        <button
          class="home-view__settings-button"
          v-if="!showSettings"
          @click="() => (showSettings = true)"
        >
          <i class="fa-solid fa-cog"></i>
          <span class="home-view__settings-word">Settings</span>
        </button>
        <button class="home-view__settings-button">
          <RouterLink v-if="!store.getUser.token" to="/login">
            <i class="fa-solid fa-sign-in"></i>
            <span class="home-view__settings-word"> Login </span>
          </RouterLink>
        </button>
      </div>
    </div>
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
    <template v-if="store.getUser.token">
      <h3>Hello {{ store.getUser.email }}</h3>
      <h4>
        <span v-if="userProfile.level || userProfile.specialty">Level</span>
        {{ userProfile.level }} {{ userProfile.specialty }}
      </h4>
    </template>
    <div class="home-view__timer-group">
      <fieldset>
        <legend class="home-view__timer-legend">Timer Type</legend>
        <div>
          <input
            type="radio"
            id="timer1"
            name="timer-type"
            value="Pomodoro"
            v-model="timerType"
            class="home-view__radio-input"
          />
          <label class="home-view__radio-label" for="timer1">Pomodoro</label>
        </div>
        <div>
          <input
            type="radio"
            id="timer2"
            name="timer-type"
            value="Short Break"
            v-model="timerType"
            class="home-view__radio-input"
          />
          <label class="home-view__radio-label" for="timer2">Short Break</label>
        </div>
        <div>
          <input
            type="radio"
            id="timer3"
            name="timer-type"
            value="Long Break"
            v-model="timerType"
            class="home-view__radio-input"
          />
          <label class="home-view__radio-label" for="timer3">Long Break</label>
        </div>
        <div class="home-view__stopwatch-div">
          <input
            type="radio"
            id="stopwatch"
            name="timer-type"
            value="Stopwatch"
            v-model="timerType"
            class="home-view__radio-input"
          />
          <label class="home-view__radio-label" for="stopwatch"
            >Stopwatch</label
          >
        </div>
      </fieldset>
      <GenericStopwatch
        v-if="timerType === 'Stopwatch'"
        @finished="handleStopWatchFinished"
      />
      <GenericTimer
        :timer-minutes="timerMinutes"
        :timer-type="timerType"
        :auto-start-timer="autoStartTimer"
        :play-timer-sounds="playTimerSounds"
        @finished="handleTimerFinished"
        @stopped="handleTimerStopped"
        @started="handleTimerStarted"
        v-else
      />
    </div>
    <div class="home-view__info-section">
      <div>
        <p>Total pomodoros:</p>
        <span>{{ finishedPomos }}</span>
      </div>
      <div>
        <p>Pomos since long break:</p>
        <span>{{ pomosSinceLastLongBreak }}</span>
      </div>
      <div>
        <p>Total stopwatch sessions:</p>
        <span>{{ totalFocusSessions }}</span>
      </div>
      <div>
        <p>Total focus minutes:</p>
        <span>{{ totalFocusMinutes.toFixed(1) }}</span>
      </div>
    </div>
    <div>User Profile: {{ userProfile }}</div>
  </div>
</template>
<style scoped>
.home-view__header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  border-bottom: 1px solid #4b4e5a;
  margin-bottom: 30px;
}

.home-view__header h1 {
  margin: 5px 0;
}

.home-view__settings-button {
  background-color: #656874;
  color: white;
  padding: 6px;
  align-self: center;
  font-size: 18px;
  border-radius: 6px;
  margin-right: 5px;
}

a {
  text-decoration: none;
  color: inherit;
}

.home-view__settings-word {
  display: none;
}

p {
  margin: 0px;
}

.home-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home-view__radio-input {
  appearance: none;
  width: 0;
  height: 0;
  margin-bottom: 25px;
}

.home-view__radio-label {
  border: 3px solid transparent;
  padding: 5px;
  cursor: pointer;

  font-size: 20px;
  white-space: nowrap;
}

.home-view__radio-input:checked + .home-view__radio-label {
  background-color: #4d505c;
  border-radius: 6px;
}

.home-view__timer-legend {
  visibility: hidden;
}

fieldset {
  border: none;
}

.home-view__timer-group {
  background-color: #656874;
  border-radius: 6px;
  width: 90%;
}

.home-view__timer-group fieldset {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.home-view__timer-group fieldset div {
  display: flex;
}

.home-view__stopwatch-div {
  width: 100%;
}

.home-view__info-section {
  margin-top: 20px;
  font-size: 20px;
  min-width: 250px;
}

.home-view__info-section div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.home-view__info-section div span {
  margin-left: 30px;
}

@media (min-width: 800px) {
  .home-view__header {
    width: 580px;
  }

  .home-view__settings-word {
    display: inline;
    margin-left: 5px;
  }

  .home-view__timer-group {
    width: 650px;
  }
}
</style>

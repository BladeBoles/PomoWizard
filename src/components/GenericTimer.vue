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
  autoStartTimer: { type: Boolean, default: false },
  playTimerSounds: { type: Boolean, required: true }
})

const emit = defineEmits(['finished', 'started', 'stopped'])

const timerWorker = new Worker('../workers/timer-worker.js')

interface TimerObject {
  nextId: number
  callbacks: {
    [key: number]: { fn: any; context: any }
  }
  setInterval: (cb: any, interval: any, context?: any) => {}
  onMessage: (e: any) => void
  clearInterval: (e: any) => void
}

const timerObject: TimerObject = {
  nextId: 0,
  callbacks: {},

  setInterval: function (cb, interval, context) {
    console.log(
      '🚀 ~ file: GenericTimer.vue:76 ~ timerObject: TimerObject.cb, interval,:',
      cb,
      interval
    )
    this.nextId++
    const currentId = this.nextId
    this.callbacks[currentId] = { fn: cb, context }

    timerWorker.postMessage({
      command: 'interval:start',
      interval,
      id: currentId
    })

    // TODO: why do we need to return this?
    return currentId
  },

  onMessage: function (e) {
    switch (e.data.message) {
      case 'interval:tick': {
        let callback = this.callbacks[e.data.id]
        // TODO: BB wtf does this mean?
        if (callback && callback.fn) {
          callback.fn.apply(callback.context)
        }
        break
      }
    }
  },
  clearInterval: function (id) {
    timerWorker.postMessage({
      command: 'interval:clear',
      id
    })
  }
}

// Lets the handler function utilize the scope "this" has inside the object
timerWorker.onmessage = timerObject.onMessage.bind(timerObject)

console.log('🚀 ~ file: GenericTimer.vue:27 ~ timerWorker:', timerWorker)

const startTimer = async () => {
  console.log('starting timer!', remainingTimerSeconds.value)
  if (remainingTimerSeconds.value > 0) {
    timerEnabled.value = true

    const subtractSecondAndRestart = () => {
      console.log('subtract and restart!')
      remainingTimerSeconds.value--
      if (remainingTimerSeconds.value > 0) {
        startTimer()
      }
    }
    timerObject.setInterval(subtractSecondAndRestart, 1000)
  }
  emit('started')
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

// watch(timerEnabled, (newValue, oldValue) => {
//   if (remainingTimerSeconds.value > 0 && newValue && newValue !== oldValue) {
//     timeoutID.value = setTimeout(() => {
//       remainingTimerSeconds.value--
//     }, 1000)
//   }
// })
watch(remainingTimerSeconds, (newValue) => {
  // if (newValue > 0 && timerEnabled.value === true) {
  //   timeoutID.value = setTimeout(() => {
  //     remainingTimerSeconds.value--
  //   }, 1000)
  // }
  if (newValue === 0 && timerEnabled.value === true) {
    timerEnabled.value = false
    const focusSeconds = props.timerMinutes * 60 - remainingTimerSeconds.value
    emit('finished', { focusSeconds })
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
watch(
  () => props.timerMinutes,
  () => {
    remainingTimerSeconds.value = props.timerMinutes * 60
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

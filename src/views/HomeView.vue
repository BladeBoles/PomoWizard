<script setup lang="ts">
import { ref, watch, watchEffect } from 'vue'
const timerEnabled = ref(true)
const timerCount = ref(30)

watch(timerEnabled, (newValue) => {
  console.log('timerEnabled watcher, newvalue: ', newValue)
  if (newValue) {
    setTimeout(() => {
      timerCount.value--
    }, 1000)
  }
})

watchEffect(() => {
  if (timerCount.value > 0 && timerEnabled.value) {
    console.log('current timerCount is', timerCount.value)
    setTimeout(() => {
      timerCount.value--
    }, 1000)
  }
})

const play = () => (timerEnabled.value = true)
const pause = () => (timerEnabled.value = false)
</script>

<template>
  <main>
    <div>
      <h1>Pomodoro Timer</h1>
      <p>Timer Demo</p>
      {{ timerCount }}
      <button @click="play">Play</button>
      <button @click="pause">Pause</button>
    </div>
  </main>
</template>

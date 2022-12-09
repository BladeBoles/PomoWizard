<script setup lang="ts">
import { useTimer, useStopwatch } from 'vue-timer-hook'

const time = new Date()
time.setSeconds(time.getSeconds() + 600) // 10 minutes timer
const timer = useTimer(time)
const restartFive = () => {
  // Restarts to 5 minutes timer
  const time = new Date()
  time.setSeconds(time.getSeconds() + 300)
  timer.restart(time)
}

const autoStart = true
const stopwatch = useStopwatch(autoStart)
</script>

<template>
  <main>
    <div>
      <h1>vue-timer-hook</h1>
      <p>Timer Demo</p>
      <div>
        <span>{{ timer.days }}</span
        >:<span>{{ timer.hours }}</span
        >:<span>{{ timer.minutes }}</span
        >:<span>{{ timer.seconds }}</span>
      </div>
      <p>{{ timer.isRunning ? 'Running' : 'Not running' }}</p>
      <button @click="timer.start()">Start</button>
      <button @click="timer.pause()">Pause</button>
      <button @click="timer.resume()">Resume</button>
      <button @click="restartFive()">Restart</button>
    </div>
    <div>
      <h1>vue-timer-hook</h1>
      <p>Stopwatch Demo</p>
      <div>
        <span>{{ stopwatch.days }}</span
        >:<span>{{ stopwatch.hours }}</span
        >:<span>{{ stopwatch.minutes }}</span
        >:<span>{{ stopwatch.seconds }}</span>
      </div>
      <p>{{ stopwatch.isRunning ? 'Running' : 'Not running' }}</p>
      <button @click="stopwatch.start()">Start</button>
      <button @click="stopwatch.pause()">Pause</button>
      <button @click="stopwatch.reset()">Reset</button>
    </div>
  </main>
</template>

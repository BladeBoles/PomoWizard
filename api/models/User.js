const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  totalFocusMinutes: {
    type: Number,
    default: 0
  },
  totalPomodoros: {
    type: Number,
    default: 0
  },
  totalStopwatchSessions: {
    type: Number,
    default: 0
  },
  pomodorosSinceLongBreak: {
    type: Number,
    default: 0
  }
})

const User = model('User', userSchema)

module.exports = User
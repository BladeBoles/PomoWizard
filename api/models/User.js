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
  totalTodosCompleted: {
    type: Number,
    default: 0
  },
  pomodorosSinceLongBreak: {
    type: Number,
    default: 0
  },
  experiencePoints: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  specialty: {
    type: String,
    default: 'Fire Mage'
  },
  todos: [
    {
      title: String,
      description: String,
      completed: {
        type: Boolean,
        default: false
      },
      dateCompleted: Date
    }
  ],
  history: [
    {
      day: Date,
      totalPomodoros: Number,
      totalFocusMinutes: Number,
      totalStopwatchSessions: Number
    }
  ]
})

const User = model('User', userSchema)

module.exports = User

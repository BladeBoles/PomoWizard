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
  focusMinutes: {
    type: Number,
    default: 0
  },
  totalPomodoros: {
    type: Number,
    default: 0
  }
})

const User = model('User', userSchema)

module.exports = User
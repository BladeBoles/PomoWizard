const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')

exports.register_user = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = new User({
    email,
    password: hashedPassword
  })

  await user.save()

  res.status(201).json({ message: 'User successfully created' })
})

exports.login_user = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (!user) {
    return res.status(401).json({ message: 'Authentication failed' })
  }

  const passwordMatch = await bcrypt.compare(password, user.password)

  if (!passwordMatch) {
    return res.status(401).json({ message: 'Authentication failed' })
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email
    },
    'secretkey',
    { expiresIn: '1h' }
  )

  res.status(200).json({ token, email })
})

exports.update_profile = asyncHandler(async (req, res) => {
  const { email } = req.userData
  const {
    totalFocusMinutes,
    totalPomodoros,
    pomodorosSinceLongBreak,
    totalStopwatchSessions,
    totalTodosCompleted
  } = req.body

  const currentUser = await User.findOne({
    email
  })
  const newTotalExperience =
    currentUser.experiencePoints +
    ((totalFocusMinutes
      ? totalFocusMinutes - currentUser.totalFocusMinutes
      : 0) +
      (totalTodosCompleted
        ? totalTodosCompleted - currentUser.totalTodosCompleted
        : 0)) *
      10
  const newLevel = parseInt((newTotalExperience + 1000) / 1000)
  const updateFields = {
    ...(typeof totalFocusMinutes === 'number' && { totalFocusMinutes }),
    ...(typeof totalPomodoros === 'number' && { totalPomodoros }),
    ...(typeof pomodorosSinceLongBreak === 'number' && {
      pomodorosSinceLongBreak
    }),
    ...(typeof totalStopwatchSessions === 'number' && {
      totalStopwatchSessions
    }),
    ...(typeof totalTodosCompleted === 'number' && {
      totalTodosCompleted
    }),
    experiencePoints: newTotalExperience,
    level: newLevel
  }
  await User.updateOne({ email }, { ...updateFields })
  const updatedUser = await User.findOne({
    email
  })

  res.json({
    focusMinutes: updatedUser.totalFocusMinutes,
    totalPomodoros: updatedUser.totalPomodoros,
    pomodorosSinceLongBreak: updatedUser.pomodorosSinceLongBreak,
    totalStopwatchSessions: updatedUser.totalStopwatchSessions,
    experiencePoints: updatedUser.experiencePoints,
    level: updatedUser.level,
    specialty: updatedUser.specialty
  })
})

exports.get_profile = asyncHandler(async (req, res) => {
  const { email } = req.userData
  const userProfile = await User.findOne({
    email
  })
  res.json({
    email: userProfile.email,
    userId: userProfile._id,
    focusMinutes: userProfile.totalFocusMinutes,
    totalPomodoros: userProfile.totalPomodoros,
    pomodorosSinceLongBreak: userProfile.pomodorosSinceLongBreak,
    totalStopwatchSessions: userProfile.totalStopwatchSessions,
    experiencePoints: userProfile.experiencePoints,
    level: userProfile.level,
    specialty: userProfile.specialty
  })
})

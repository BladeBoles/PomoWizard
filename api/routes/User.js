const { Router } = require('express')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth')


const router = Router()

router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = new User({
      email,
      password: hashedPassword
    })

    await user.save()

    res.status(201).json({ message: 'User successfully created' })
  } catch (err) {
    console.lerror(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Authentication failed' })
    }

    const token = jwt.sign({
      userId: user._id, email: user.email
    }, 'secretkey', { expiresIn: '1h' })

    res.status(200).json({ token, email })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error' })
  }
})

router.post('/profile', authMiddleware, async (req, res) => {
  console.log('🚀 ~ file: User.js:58 ~ router.post ~ req:', req.body)
  const { email } = req.userData
  const { totalFocusMinutes, totalPomodoros, pomodorosSinceLongBreak, totalStopwatchSessions } = req.body

  const updateFields = {
    ...(typeof totalFocusMinutes === 'number' && { totalFocusMinutes }),
    ...(typeof totalPomodoros === 'number' && { totalPomodoros }),
    ...(typeof pomodorosSinceLongBreak === 'number' && { pomodorosSinceLongBreak }),
    ...(typeof totalStopwatchSessions === 'number' && { totalStopwatchSessions })
  }
  console.log('🚀 ~ file: User.js:63 ~ router.post ~ updateFields:', updateFields)
  const userProfile = await User.updateOne({ email }, { ...updateFields })
  const updatedUser = await User.findOne({
    email
  })
  console.log('🚀 ~ file: User.js:73 ~ router.post ~ updatedUser:', updatedUser.totalPomodoros)

  res.json({
    totalFocusMinutes: updatedUser.totalFocusMinutes, totalPomodoros: updatedUser.totalPomodoros, pomodorosSinceLongBreak: updatedUser.pomodorosSinceLongBreak,
    totalStopwatchSessions: updatedUser.totalStopwatchSessions
  })
})
router.get('/profile', authMiddleware, async (req, res) => {
  const { email } = req.userData
  const userProfile = await User.findOne({
    email
  })
  res.json({
    email: userProfile.email,
    userId: userProfile._id,
    focusMinutes: userProfile.totalFocusMinutes, totalPomodoros: userProfile.totalPomodoros, pomodorosSinceLongBreak: userProfile.pomodorosSinceLongBreak,
    totalStopwatchSessions: userProfile.totalStopwatchSessions
  })
})

router.get('/', async (req, res) => {
  res.send('Hello world')
})
module.exports = router
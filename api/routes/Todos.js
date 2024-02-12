const { Router } = require('express')
const Todo = require('../models/Todo')
const authMiddleware = require('../middlewares/auth')

const router = Router()

router.post('/todos/create', authMiddleware, async (req, res) => {
  const { email } = req.userData
  const { title, description, dateCompleted } = req.body

  const todoOwner = await User.findOne({
    email
  })._id
  await Todo.create({ owner: todoOwner, title, description, dateCompleted })
  const newTodo = Todo.findOne({ title, description })

  res.json({
    ...newTodo
  })
})
// TODO: figure out if that's how we want to handle todos.  Should they just be a subdocument on a user?
router.get('/profile', authMiddleware, async (req, res) => {
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

router.get('/', async (req, res) => {
  res.send('Hello world')
})
module.exports = router

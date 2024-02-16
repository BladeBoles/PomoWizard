const { Router } = require('express')
const User = require('../models/User')
const authMiddleware = require('../middlewares/auth')

const router = Router()

router.post('/todos/create', authMiddleware, async (req, res) => {
  const { email } = req.userData
  const { title, description, completed, dateCompleted } = req.body
  const newTodo = { title, description, completed, dateCompleted }

  const todoOwner = await User.findOne({
    email
  })._id

  const updatedTodos = todoOwner.todos.push(newTodo)

  await User.updateOne({ email }, { todos: updatedTodos })
  res.json({
    ...newTodo
  })
})
router.post('/todos/update', authMiddleware, async (req, res) => {
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
module.exports = router

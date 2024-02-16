const User = require('../models/User')
const asyncHandler = require('express-async-handler')

exports.getAll = asyncHandler(async (req, res) => {
  const { email } = req.userData
  try {
    const todoOwner = await User.findOne({
      email
    })
    if (!todoOwner) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(todoOwner.todos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
})
exports.create = asyncHandler(async (req, res) => {
  const { email } = req.userData
  const { title, description, completed, dateCompleted } = req.body
  const newTodo = { title, description, completed, dateCompleted }
  try {
    const todoOwner = await User.findOne({
      email
    })
    if (!todoOwner) {
      return res.status(404).json({ message: 'User not found' })
    }

    todoOwner.todos.push(newTodo)

    const updatedUser = await todoOwner.save()

    res.json(updatedUser.todos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
})

exports.updateAll = asyncHandler(async (req, res) => {
  const { email } = req.userData
  const { todos } = req.body
  try {
    const result = await User.findOneAndUpdate(
      {
        email
      },
      {
        $set: { todos }
      },
      { new: true }
    )
    if (!result) {
      return res.status(404).json({ message: 'User not found' })
    }
    result.json(result.todos)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
})

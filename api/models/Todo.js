const { Schema, model } = require('mongoose')

const todoSchema = new Schema({
  title: {
    type: String,
    default: 'Untitled'
  },
  description: { type: String },
  dateCompleted: {
    type: Date,
    default: null
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

const Todo = model('Todo', todoSchema)

module.exports = Todo

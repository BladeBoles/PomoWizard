import axios from 'axios'
import { useUserStore } from '../stores/user'
const store = useUserStore()
const { token } = store.getUser()

interface Todo {
  name: string
  description?: string
  completed: boolean
  completedDate?: Date
}

interface ResponseTodo extends Todo {
  _id: string
}
export default {
  getTodos: async () => {
    const response = await axios.get<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response
  },
  createTodo: async (todo: Todo) => {
    const response = await axios.post<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos/create`,
      { todo },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response
  },
  updateTodos: async (todos: Todo[]) => {
    const response = await axios.post<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos/update`,
      { todos },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response
  }
}

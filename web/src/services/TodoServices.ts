import axios from 'axios'
import { useUserStore } from '../stores/user'

interface Todo {
  title: string
  description?: string
  completed: boolean
  completedDate?: Date
}

interface ResponseTodo extends Todo {
  _id: string
}
export default {
  getTodos: async () => {
    const store = useUserStore()
    const { token } = store.getUser
    const response = await axios.get<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response
  },
  createTodo: async (todo: Todo) => {
    const store = useUserStore()
    const { token } = store.getUser
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
    const store = useUserStore()
    const { token } = store.getUser
    const response = await axios.post<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos/updateAll`,
      { todos },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response
  }
}

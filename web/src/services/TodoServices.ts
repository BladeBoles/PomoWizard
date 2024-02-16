import axios from 'axios'
interface Todo {
  name: string
  description: string
  completed: boolean
  completedDate?: Date
}

interface ResponseTodo extends Todo {
  _id: string
}
export default {
  createTodo: async (todo: Todo) => {
    const response = await axios.post<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos/create`,
      { ...todo },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response
  },
  updateTodos: async (token: string, email: string, todos: Todo[]) => {
    const response = await axios.post<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos/update`,
      { todos },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response
  }
}

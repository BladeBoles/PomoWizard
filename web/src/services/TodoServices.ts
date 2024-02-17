import axios from 'axios'

interface Todo {
  title: string
  description?: string
  completed: boolean
  completedDate?: Date
}

interface ResponseTodo extends Todo {
  _id: string
}

axios.defaults.withCredentials = true
export default {
  getTodos: async () => {
    const response = await axios.get<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos`
    )
    return response
  },
  createTodo: async (todo: Todo) => {
    const response = await axios.post<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos/create`,
      { todo }
    )
    return response
  },
  updateTodos: async (todos: Todo[]) => {
    const response = await axios.post<ResponseTodo[]>(
      `${import.meta.env.VITE_API_HOST}/api/todos/updateAll`,
      { todos }
    )
    return response
  }
}

import axios from 'axios'

interface UpdateFields {
  totalFocusMinutes?: number
  totalPomodoros?: number
  pomodorosSinceLongBreak?: number
  totalStopwatchSessions?: number
  totalTodosCompleted?: number
}
interface UpdateUserProfileResponse {
  focusMinutes?: Number
  totalPomodoros?: Number
  pomodorosSinceLongBreak?: Number
  totalStopwatchSessions?: Number
  experiencePoints?: Number
  level?: Number
  specialty?: String
  totalTodosCompleted?: Number
}

axios.defaults.withCredentials = true
export default {
  checkAuthStatus: async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_HOST}/api/users/validate`
      )
      console.log('response is: ', response)
      return response.data.valid
    } catch (error) {
      return false
    }
  },
  signUserUp: async (email: string, password: string) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_HOST}/api/users/register`,
      {
        email,
        password
      }
    )
    return response
  },
  logUserIn: async (email: string, password: string) => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_HOST}/api/users/login`,
      {
        email,
        password
      }
    )
    return response
  },

  updateUserProfile: async (updateFields: UpdateFields) => {
    const {
      totalFocusMinutes,
      totalPomodoros,
      pomodorosSinceLongBreak,
      totalStopwatchSessions,
      totalTodosCompleted
    } = updateFields
    const response = await axios.post<UpdateUserProfileResponse>(
      `${import.meta.env.VITE_API_HOST}/api/users/profile`,
      {
        totalFocusMinutes,
        totalPomodoros,
        pomodorosSinceLongBreak,
        totalStopwatchSessions,
        totalTodosCompleted
      }
    )
    return response
  },
  getUserProfile: async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_HOST}/api/users/profile`
    )
    return response
  }
}

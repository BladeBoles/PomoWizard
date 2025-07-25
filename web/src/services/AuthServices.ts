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
    return await axios.post(
      `${import.meta.env.VITE_API_HOST}/api/users/register`,
      {
        email,
        password
      }
    )
  },
  logUserIn: async (email: string, password: string) => {
    return await axios.post(
      `${import.meta.env.VITE_API_HOST}/api/users/login`,
      {
        email,
        password
      }
    )
  },

  updateUserProfile: async (updateFields: UpdateFields) => {
    const {
      totalFocusMinutes,
      totalPomodoros,
      pomodorosSinceLongBreak,
      totalStopwatchSessions,
      totalTodosCompleted
    } = updateFields
    return await axios.post<UpdateUserProfileResponse>(
      `${import.meta.env.VITE_API_HOST}/api/users/profile`,
      {
        totalFocusMinutes,
        totalPomodoros,
        pomodorosSinceLongBreak,
        totalStopwatchSessions,
        totalTodosCompleted
      }
    )
  },
  getUserProfile: async () => {
    return await axios.get(
      `${import.meta.env.VITE_API_HOST}/api/users/profile`
    )
  }
}

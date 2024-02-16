import axios from 'axios'

import { useUserStore } from '../stores/user'
interface UpdateFields {
  totalFocusMinutes?: number
  totalPomodoros?: number
  pomodorosSinceLongBreak?: number
  totalStopwatchSessions?: number
}
interface UpdateUserProfileResponse {
  focusMinutes?: Number
  totalPomodoros?: Number
  pomodorosSinceLongBreak?: Number
  totalStopwatchSessions?: Number
  experiencePoints?: Number
  level?: Number
  specialty?: String
}

export default {
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
    const store = useUserStore()
    const { token } = store.getUser

    const {
      totalFocusMinutes,
      totalPomodoros,
      pomodorosSinceLongBreak,
      totalStopwatchSessions
    } = updateFields
    const response = await axios.post<UpdateUserProfileResponse>(
      `${import.meta.env.VITE_API_HOST}/api/users/profile`,
      {
        totalFocusMinutes,
        totalPomodoros,
        pomodorosSinceLongBreak,
        totalStopwatchSessions
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    return response
  },

  getUserProfile: async () => {
    const store = useUserStore()
    const { token } = store.getUser

    const response = await axios.get(
      `${import.meta.env.VITE_API_HOST}/api/users/profile`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )
    return response
  }
}

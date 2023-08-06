import axios from 'axios'

interface UpdateFields {
  totalFocusMinutes?: number
  totalPomodoros?: number
  pomodorosSinceLongBreak?: number
  totalStopwatchSessions?: number
}
export default {
  signUserUp: async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3000/api/users/register', {
      email,
      password
    }).then((response) => {
      return response
    }, (error) => {
      return error
    })
    return response
  },
  logUserIn: async (email: string, password: string) => {
    const response = await axios.post('http://localhost:3000/api/users/login', {
      email,
      password
    }).then((response) => {
      return response
    }, (error) => {
      return error
    })
    return response
  },
  updateUserProfile: async (token: string, email: string, updateFields: UpdateFields) => {
    const { totalFocusMinutes,
      totalPomodoros,
      pomodorosSinceLongBreak,
      totalStopwatchSessions } = updateFields
    const response = await axios.post('http://localhost:3000/api/users/profile', {
      email,
      totalFocusMinutes,
      totalPomodoros,
      pomodorosSinceLongBreak,
      totalStopwatchSessions
    }, { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      return response
    }, (error) => {
      return error
    })
    return response
  },
  getUserProfile: async (token: string) => {
    const response = await axios.get('http://localhost:3000/api/users/profile', { headers: { Authorization: `Bearer ${token}` } }).then((response) => {
      return response
    }, (error) => {
      return error
    })
    return response
  }
}
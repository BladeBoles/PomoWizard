import AuthServices from '@/services/AuthServices'
import { defineStore } from 'pinia'

interface UserType {
  token?: string
  email?: string
  totalPomodoros?: number
  pomodorosSinceLongBreak?: number
  totalStopwatchSessions?: number
  totalFocusMinutes?: number
  level?: number
  specialty?: string
  experiencePoints?: number
}
export const useUserStore = defineStore('user', {
  state: () => ({ user: {} as UserType, isAuthenticated: false }),
  getters: {
    getUser: (state) => state.user,
    getIsAuthenticated: (state) => state.isAuthenticated
  },
  actions: {
    saveUser(user: UserType) {
      this.$state.user = user
    },
    async checkAuthentication() {
      console.log('check authentication fired')
      try {
        const isAuthenticated = await AuthServices.checkAuthStatus()
        console.warn(
          'DEBUGPRINT[1]: user.ts:26: isAuthenticated=',
          isAuthenticated
        )
        this.isAuthenticated = isAuthenticated
        if (isAuthenticated) {
          // Optionally fetch user profile and update state
          const userProfile = await AuthServices.getUserProfile()
          this.user = userProfile.data
        }
      } catch (error) {
        console.warn('DEBUGPRINT[1]: user.ts:26: error=', error)
      }
    }
  }
})

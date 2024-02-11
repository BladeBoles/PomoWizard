import { ref, computed } from 'vue'
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
  state: () => ({ user: {} as UserType }),
  getters: {
    getUser: (state) => state.user
  },
  actions: {
    saveUser(user: UserType) {
      this.$state.user = user
    }
  }
})

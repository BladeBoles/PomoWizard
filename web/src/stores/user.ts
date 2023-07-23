import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface UserType {
  token?: string
  email?: string
}
export const useUserStore = defineStore('user', {
  state: () => ({ user: {} as UserType }),
  getters: {
    getUser: (state) => state.user
  },
  actions: {
    saveUser(user: UserType) {
      this.$state.user = user
    },
  },
})


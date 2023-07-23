<script setup lang="ts">
import { ref } from 'vue'
import AuthServices from '../services/AuthServices'

const loginChoice = ref('Log In')
const signupPassword = ref('')
const signupEmail = ref('')
const loginPassword = ref('')
const loginEmail = ref('')

const signUp = async () => {
  console.log('signing up...')
  await AuthServices.signUserUp(signupEmail.value, signupPassword.value)
}
const logIn = async () => {
  await AuthServices.logUserIn(loginEmail.value, loginPassword.value)
}
</script>

<template>
  <div>
    <fieldset>
      <legend class="login-view__select-action">Login or Signup</legend>
      <div>
        <input
          type="radio"
          id="login-choice"
          name="choice"
          value="Log In"
          v-model="loginChoice"
          class="login-view__radio-input"
        />
        <label class="login-view__radio-label" for="login-choice">Log In</label>
      </div>
      <div>
        <input
          type="radio"
          id="signup-choice"
          name="choice"
          value="Sign Up"
          v-model="loginChoice"
          class="home-view__radio-input"
        />
        <label class="login-view__radio-label" for="signup-choice"
          >Sign Up</label
        >
      </div>
    </fieldset>
    <form
      @submit.prevent="signUp"
      class="login-view__signup-form"
      v-if="loginChoice === 'Sign Up'"
    >
      <div class="login-view__signup-form-section">
        <label for="signup-email"> Email: </label>
        <input v-model="signupEmail" type="email" id="signup-email" required />
      </div>
      <div class="login-view__signup-form-section">
        <label for="signup-password"> Password: </label>
        <input
          v-model="signupPassword"
          type="password"
          id="signup-password"
          required
        />
      </div>
      <button>Create Account</button>
    </form>
    <form @submit.prevent="logIn" v-else class="login-view__login-form">
      <div class="login-view__login-form-section">
        <label for="login-email"> Email: </label>
        <input v-model="loginEmail" type="email" id="login-email" required />
      </div>
      <div class="login-view__login-form-section">
        <label for="login-password"> Password: </label>
        <input
          v-model="loginPassword"
          type="password"
          id="login-password"
          required
        />
      </div>
      <button>Log In</button>
    </form>
  </div>
</template>

<style scoped></style>

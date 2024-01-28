<script setup lang="ts">
import { ref } from 'vue'
import AuthServices from '../services/AuthServices'
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const store = useUserStore()
const router = useRouter()

const loginChoice = ref('Log In')
const signupPassword = ref('')
const signupEmail = ref('')
const loginPassword = ref('')
const loginEmail = ref('')

const signUp = async () => {
  await AuthServices.signUserUp(signupEmail.value, signupPassword.value)
}
const logIn = async () => {
  const logInResponse = await AuthServices.logUserIn(
    loginEmail.value,
    loginPassword.value
  )
  store.saveUser(logInResponse.data)
  if (store.getUser.token) {
    router.push({
      name: 'home'
    })
  }
}
</script>

<template>
  <div class="login-view">
    <div class="login-view-sizer">
      <fieldset class="tab-selector">
        <div class="tab-option">
          <input type="radio" id="login-choice" name="choice" value="Log In" v-model="loginChoice" class="tab-radio" />
          <label class="tab-label" for="login-choice">Log In</label>
        </div>
        <div class="tab-option">
          <input type="radio" id="signup-choice" name="choice" value="Sign Up" v-model="loginChoice" class="tab-radio" />
          <label class="tab-label" for="signup-choice">Sign Up</label>
        </div>
      </fieldset>
      <form @submit.prevent="signUp" class="login-view__signup-form" v-if="loginChoice === 'Sign Up'">
        <div class="login-view__signup-form-section">
          <label for="signup-email"> Email: </label>
          <input v-model="signupEmail" type="email" id="signup-email" required />
        </div>
        <div class="login-view__signup-form-section">
          <label for="signup-password"> Password: </label>
          <input v-model="signupPassword" type="password" id="signup-password" required />
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
          <input v-model="loginPassword" type="password" id="login-password" required />
        </div>
        <button>Log In</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
label {
  margin-bottom: 0;
  padding-bottom: 0;
}

.login-view-sizer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
}

.login-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.tab-selector {
  border-radius: 8px;
  overflow: hidden;
  display: inline-block;
}

.tab-option {
  display: inline-block;
}

.tab-radio {
  display: none;
}

.tab-label {
  display: inline-block;
  padding: 10px 20px;
  cursor: pointer;
  background-color: #f0f0f0;
  color: #333;
  transition: background-color 0.3s, color 0.3s;
  border: 1px solid #ccc;
  margin-right: -1px;
  /* Overlap the borders */
}

/* Style for the label when its radio button is checked */
.tab-radio:checked+.tab-label {
  background-color: #4CAF50;
  color: white;
  border-bottom: none;
  position: relative;
  z-index: 1;
}

/* Additional Styling for the form */
/* ... Your existing styles ... */
.login-view__select-action {
  font-size: 1.5em;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

fieldset {
  border: none;
  margin: 0;
  padding: 0;
}

.login-view__radio-input {
  margin-right: 5px;
}

.login-view__radio-label {
  margin-right: 20px;
  font-weight: 600;
}

.login-view__signup-form,
.login-view__login-form {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.login-view__signup-form-section,
.login-view__login-form-section {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #555;
  font-weight: bold;
}

input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>

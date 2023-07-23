<script setup lang="ts">
import { ref } from 'vue'

const loginChoice = ref('Log In')
</script>

<template>
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
      <label class="login-view__radio-label" for="signup-choice">Sign Up</label>
    </div>
  </fieldset>
  <form class="login-view__signup-form">
    <div class="login-view__signup-form-section">
      <input type="email" id="signup-email" required />
      <label for="signup-email"> Enter your email: </label>
    </div>
    <div class="login-view__signup-form-section">
      <input type="password" id="signup-password" required />
      <label for="signup-password"> Enter your password: </label>
    </div>
  </form>
  <form class="login-view__login-form">
    <div class="login-view__login-form-section">
      <input type="email" id="login-email" required />
      <label for="login-email"> Enter your email: </label>
    </div>
    <div class="login-view__login-form-section">
      <input type="password" id="login-password" required />
      <label for="login-password"> Enter your password: </label>
    </div>
  </form>
</template>

<style scoped></style>

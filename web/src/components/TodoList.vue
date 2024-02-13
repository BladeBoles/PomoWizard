<template>
  <div>
    <ul>
      <li v-for="(todo, index) in todos" :key="index">
        {{ todo.name }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const todos = ref([])
</script>

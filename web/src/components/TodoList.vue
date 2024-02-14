<template>
  <div class="todo-list__container">
    <div class="todo-list__add-todo-area">
      <input type="text" v-model="newTodo" />
      <button class="todo-list__add-button" @click="addTodo">Add Todo</button>
    </div>

    <VueDraggableNext class="todo-list__draggable" :list="todos">
      <div class="todo-list__item" v-for="(todo, index) in todos" :key="index">
        {{ todo.name }}
      </div>
    </VueDraggableNext>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
const todos = ref([{ name: 'Todo 1' }, { name: 'Todo 2' }, { name: 'Todo 3' }])
const newTodo = ref('Something else')
const addTodo = () => {
  todos.value.push({ name: newTodo.value })
}
</script>

<style scoped>
.todo-list__add-todo-area {
  display: flex;
  margin-bottom: 10px;
}
.todo-list__add-button {
  margin-left: 10px;
}
.todo-list__container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.todo-list__draggable {
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
}

.todo-list__item {
  cursor: pointer;
  border: 2px solid white;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>

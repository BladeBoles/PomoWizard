<template>
  <div class="todo-list__container">
    <div class="todo-list__add-todo-area">
      <input type="text" v-model="newTodo" />
      <button class="todo-list__add-button" @click="addTodo">Add Todo</button>
    </div>

    <VueDraggableNext class="todo-list__draggable" :list="todos">
      <div class="todo-list__item" v-for="(todo, index) in todos" :key="index">
        <span :class="todo.completed && 'todo-list__completed-todo'">{{
          todo.name
        }}</span>
        <span>
          <a
            @click="completeTodo(index)"
            class="todo-list__complete-item-button"
          >
            <i class="fa-solid fa-check"> </i>
          </a>
          <a @click="removeTodo(index)" class="todo-list__remove-item-button">
            <i class="fa-solid fa-xmark"> </i> </a
        ></span>
      </div>
    </VueDraggableNext>
  </div>
</template>

<script lang="ts" setup>
import { ref, warn, onMounted } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'
import TodoServices from '@/services/TodoServices'

interface Todo {
  name: string
  completed?: boolean
}
const emit = defineEmits(['todo-completed'])
const todos = ref<Todo[]>([])
const newTodo = ref('Something else')
const addTodo = () => {
  todos.value.push({ name: newTodo.value })
}
const completeTodo = (index: number) => {
  const newValue = !todos.value[index].completed
  if (newValue) {
    emit('todo-completed')
  }
  todos.value[index].completed = newValue
}
const removeTodo = (index: number) => {
  todos.value.splice(index, 1)
}
onMounted(async() => {
const currentTodos = TodoServices.
})
</script>

<style scoped>
.todo-list__complete-item-button {
  margin: 0 10px;
  align-self: center;
  color: green;
}

.todo-list__remove-item-button {
  align-self: center;
  color: red;
}

.fa-square-check {
  font-size: 20px;
  width: 100%;
  margin-left: 10px;
  align-self: center;
}

.todo-list__item {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 300px;
  min-height: 40px;
  align-items: center;
  font-size: 20px;
}

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

.todo-list__completed-todo {
  text-decoration: line-through;
}
</style>

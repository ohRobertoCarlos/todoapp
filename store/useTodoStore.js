import { defineStore } from "pinia";

export const useTodoStore = defineStore('todos', {
  state: () => ({ todos: [] }),
  getters: {
    getTodos: (state) => state.todos,
  },
  actions: {
    addTodo(todo) {
      this.todos.push(todo);
    },
    setTodos(todos) {
      this.todos = todos;
    },
  }
});

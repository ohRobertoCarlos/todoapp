<template>
  <b-container fluid="sm">
    <div class="header-page-index">
      <span class="app-title">ToDo App</span>
      <div class="header-section-buttons">
        <SwitchColorMode />
        <button @click="logout()" class="button-logout">
          <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
        </button>
      </div>
    </div>

    <div class="add-todo-section">
      <div class="input-add-todo-section">
          <input v-model="todo.content" class="input-add-todo" type="text" v-on:keyup.enter="createTodo()" placeholder="Adicione um To-Do..." name="todo">
      </div>

      <div class="button-add-todo-section">
        <button @click="createTodo()" class="button-add-todo">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>

    <div ref="todosSection" class="todos-section">
      <p class="text-no-todos" v-show="!hasTodos && !loading">Você não tem tarefas disponíveis.</p>
      <p class="text-no-todos" v-show="!hasTodos && loading">Carregando tarefas...</p>

      <div v-for="todo in todos" class="todo-item" :key="todo.id">
        <div class="todo-content-section">
          <p>
              {{ todo.content }}
          </p>
        </div>

        <div class="todo-button-delete-section">
          <button @click="deleteTodo(todo.id)" class="button-delete-todo">
            <font-awesome-icon icon="fa-solid fa-trash" />
          </button>
        </div>
      </div>
    </div>

    <div v-show="hasTodos" class="todos-page-footer">
      <b-container fluid="sm">
        <div class="todos-page-footer-content">
          <span>
            Você ainda tem {{ todosCount }} tarefa(s)
          </span>

          <button @click="deleteAllTodos()">
            Limpar todas
          </button>
        </div>
    </b-container>
    </div>
  </b-container>
</template>

<script>
import { getAccessToken, removeAccessToken, logoutAll } from '~/Utils/authentication';
import { Toast } from './../Utils/Toast';
import SwitchColorMode from '~/components/Todos/SwitchColorMode.vue';

export default {
    name: "IndexPage",
    data() {
        return {
            loading: true,
            todo: {
                content: null
            },
            todos: [],
        };
    },
    components: { SwitchColorMode },
    beforeCreate() {
        if (!getAccessToken()) {
            this.$router.push({ name: "Login" });
        }
    },
    mounted() {
        this.getTodos();
    },
    computed: {
        todosCount() {
            return this.todos.length;
        },
        hasTodos() {
            return this.todos.length > 0;
        }
    },
    methods: {
        getTodos() {
            this.$axios.get("/api/v1/todos", {
                headers: {
                    Authorization: "Bearer " + getAccessToken(),
                    Accept: "application/json"
                }
            })
            .then(response => {
                this.todos = response.data;
            })
            .catch(err => {
                Toast.fire({
                  icon: "error",
                  title: "Não foi possível carregar as tarefas.",
                });
            })
            .finally(() => {
                this.loading = false;
            });
        },
        createTodo() {
            if (!this.todo.content) {
                return;
            }

            this.$axios.post("/api/v1/todos", this.todo, {
                headers: {
                    Authorization: "Bearer " + getAccessToken(),
                    Accept: "application/json"
                }
            })
            .then(response => {
                this.resetTodoInput();
                this.todos.push(response.data);
                setTimeout(() => this.scrollBottomTodoSection(), 500);
            })
            .catch(err => {
                Toast.fire({
                  icon: "error",
                  title: "Não foi possível adicionar a tarefa.",
                });
            });
        },
        resetTodoInput() {
            this.todo = {
                content: null,
            };
        },
        logout() {
          this.setLightColorMode();
            logoutAll(this.$axios);
            removeAccessToken();
            this.$router.push({ name: "Login" });
        },
        scrollBottomTodoSection() {
            this.$refs.todosSection.scrollTop = this.$refs.todosSection.scrollHeight;
        },
        deleteTodo(todoId) {
            if (!confirm("Tem certeza?")) {
                return;
            }

            this.$axios.delete("/api/v1/todos/" + todoId, {
                headers: {
                    Authorization: "Bearer " + getAccessToken(),
                    Accept: "application/json",
                }
            })
            .then(response => {
                this.todos = this.todos.filter(t => t.id !== todoId);
            })
            .catch(err => {
                Toast.fire({
                  icon: "error",
                  title: "Não foi possível deletar a tarefa.",
                });
            });
        },
        deleteAllTodos() {
            if (!confirm("Tem certeza?")) {
                return;
            }

            this.$axios.delete("/api/v1/todos/allTodos", {
                headers: {
                    Authorization: "Bearer " + getAccessToken(),
                    Accept: "application/json",
                }
            })
            .then(response => {
                this.getTodos();
            })
            .catch(err => {
                Toast.fire({
                  icon: "error",
                  title: "Não foi possível deletar as tarefas.",
                });
            });
        },
        setLightColorMode() {
          if (process.client) {
            document.body.className = 'light-mode';
          }
        }
    },
}
</script>

<style scoped>
  .todos-section {
    margin-top: 20px;
    overflow: scroll;
    max-height: 500px;
    padding: 2px;
  }

  .todos-section::-webkit-scrollbar {
  width: 6px;
  height: 0px; /* A altura só é vista quando a rolagem é horizontal */
}

.todos-section::-webkit-scrollbar-track {
  background: transparent;
}

  .todos-section::-webkit-scrollbar-thumb {
    background-color: #8E4BE6;
  }

  .button-add-todo button.button-delete-todo .button-logout {
      height: 47px !important;
      width: 100%;
    }

  .app-title {
    font-size: 30px;
    font-weight: 700;
    color : var(--text-color);
  }

  .header-page-index {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .header-page-index button {
    width: 47px;
    height: 47px;
    background-color: transparent;
    border: none;
    color : var(--icon-color);
  }

  .add-todo-section {
    display: flex;
    align-content: stretch;
    justify-content: space-between;
  }


  .input-add-todo {
    border: 2px solid var(--border-color);
    border-radius: 3px;
    width: 100%;
    padding: 8px;
    margin-right: 5px;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .input-add-todo:focus-within {
    border: 2px solid #8E4BE6;
    box-shadow: 0 0 0 0;
    outline: 0;
    background-color: var(--bg-color);
  }

  .input-add-todo-section {
    width: 100%;
    display: flex;
    align-content: stretch;
  }

  .button-add-todo-section {
    width: 47px;
    display: flex;
    align-content: stretch;
  }

  .button-add-todo-section button {
    width: 100%;
    background-color: #8E4BE6;
    border: none;
    border-radius: 3px;
    color: white;
  }

  .todo-item {
    display: flex;
    align-content: stretch;
    justify-content: space-between;
    margin-top: 8px;
  }

  .todo-item button {
    width: 100%;
    background-color: #E64D3D;
    border: none;
    border-radius: 0 3px 3px 0;
    color: white;
  }

  .todo-content-section {
    display: flex;
    width: 100%;
    max-height: 47px;
    padding: 8px;
    align-content: stretch;
    align-content: center;
    border-radius: 3px;
    background-color: var(--todo-bg-color);
    color: var(--text-color);
  }

  .todo-button-delete-section {
    width: 47px;
    display: flex;
    align-content: stretch;
  }

  .todos-page-footer {
    display: flex;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    justify-content: space-between;
    align-content: center;
    margin-top: 10px;
    padding: 3px;
    background-color: var(--bg-color);
  }

  .todos-page-footer button {
    padding: 3px 5px;
    background-color: #8E4BE6;
    border: none;
    border-radius: 3px;
    color: white;
  }

  .text-no-todos {
    text-align: center;
    color: var(--text-color);
  }

  .todos-page-footer-content {
    display: flex;
    justify-content: space-between;
    align-content: center;
    margin-top: 10px;
    padding: 3px;
    background-color: var(--bg-color);
    color: var(--text-color);
  }

  .todos-page-footer-content button {
    padding: 3px 5px;
    background-color: #8E4BE6;
    border: none;
    border-radius: 3px;
    color: white;
  }

  .header-section-buttons {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
  }

</style>

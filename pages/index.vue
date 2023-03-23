<template>
  <b-container fluid="sm">
    <div class="header-page-index">
      <span class="app-title">ToDo App</span>
      <button @click="logout()" class="button-logout">
        <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
      </button>
    </div>

    <div class="add-todo-section">
      <div class="input-add-todo-section">
          <input v-model="todo.content" class="input-add-todo" type="text" placeholder="Adicione um To-Do..." name="todo">
      </div>

      <div class="button-add-todo-section">
        <button @click="createTodo()" class="button-add-todo">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
    </div>

    <div ref="todosSection" class="todos-section">
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
  </b-container>
</template>

<script>
import { getAccessToken, removeAccessToken } from '~/Utils/authentication';
export default {
  name: 'IndexPage',
  data() {
    return {
      loading : true,
      todo : {
        content : null
      },
      todos : [],
    }
  },
  beforeCreate() {
    if (!getAccessToken()) {
      this.$router.push({name:'Login'});
    }
  },
  mounted() {
    this.getCsrfToken();
    this.getTodos();
  },
  methods: {
    getTodos() {
      this.$axios.get('/api/v1/todos', {
        headers : {
          Authorization: 'Bearer ' + getAccessToken(),
          Accept : 'application/json'
        }
      })
      .then(response => {
        this.todos = response.data;
      })
      .catch(err => {
        //
      });
    },
    createTodo(){
      if (!this.todo.content) {
        return;
      }

      this.$axios.post('/api/v1/todos',this.todo, {
        headers : {
          Authorization: 'Bearer ' + getAccessToken(),
          Accept : 'application/json'
        }
      })
      .then(response => {
        this.getTodos();
        this.resetTodoInput();
        setTimeout(() => this.scrollBottomTodoSection(), 400);
      })
      .catch(err => {
        //
      });
    },
    resetTodoInput(){
      this.todo = {
        content : null,
      };
    },
    getCsrfToken(){
      return this.$axios.get('/sanctum/csrf-cookie')
      .then(response => {

      })
      .catch(err => {

      });
    },
    logout(){
      removeAccessToken();
      this.$router.push({name:'Login'});
    },
    scrollBottomTodoSection() {
      this.$refs.todosSection.scrollTop = this.$refs.todosSection.scrollHeight;
    },
    deleteTodo(todoId){
      if (!confirm('Tem certeza?')) {
        return;
      }

      this.$axios.delete('/api/v1/todos/' + todoId, {
        headers : {
          Authorization : 'Bearer ' + getAccessToken(),
          Accept : 'application/json',
        }
      })
      .then(response => {
        this.getTodos();
      })
      .catch(err => {

      });
    }
  }
}
</script>

<style scoped>

  .todos-section {
    margin-top: 20px;
    overflow: scroll;
    max-height: 500px;
    padding: 5px;
  }

  .todos-section::-webkit-scrollbar {
  width: 3px;
  height: 3px; /* A altura só é vista quando a rolagem é horizontal */
}

.todos-section::-webkit-scrollbar-track {
  background: transparent;
  padding: 2px;
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
  }

  .add-todo-section {
    display: flex;
    align-content: stretch;
    justify-content: space-between;
  }


  .input-add-todo {
    width: 100%;
    padding: 8px;
    margin-right: 5px;
  }

  .input-add-todo:focus-within {
    border: 2px solid #8E4BE6;
    box-shadow: 0 0 0 0;
    outline: 0;
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
    background-color: #f2f2f2;
  }

  .todo-button-delete-section {
    width: 47px;
    display: flex;
    align-content: stretch;
  }
</style>
